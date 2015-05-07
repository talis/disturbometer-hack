import nmap
from time import time, sleep, gmtime, strftime
import os, os.path
import requests
import ConfigParser
import urllib2
import subprocess
import datetime
import fileinput
from firebase import firebase

config = ConfigParser.ConfigParser()
config.read([os.path.expanduser("~/netscan/.netscan"), '/etc/netscan'])

AUTH_TOKEN = config.get('HipChat', 'token')
HIPCHAT_ROOM_ID = config.get('HipChat', 'roomid')
DELAY = config.getfloat('NetScan', 'delay')
FIREBASE_TOKEN = config.get('Firebase', 'token')
FIREBASE_EMAIL = config.get('Firebase', 'email')

def internet_on():
	try:
		urllib2.urlopen('https://api.hipchat.com', timeout=1)
		return True
	except urllib2.URLError as err:
		return False

def get_ip():
	cmd = "ifconfig eth0 | awk '/inet addr/ { print $2 } '"
	process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
	process.wait()
	return process.stdout.read().split(':')[1]

def send_message(message,color):
	# send a message via HipChat
	hipchat_url = "https://api.hipchat.com/v1/rooms/message?format=json&auth_token=" + AUTH_TOKEN

	payload = {
		'room_id':HIPCHAT_ROOM_ID,
		'from':'Netscan',
		'color':color,
		'notify':'true',
		'message':message
	}

	r = requests.post(hipchat_url, data=payload)

def wait_for_access():
	while (internet_on() == False):
		time.sleep(2)
	ip_address = get_ip()
	send_message('Talis big brother is up and monitoring on '+ ip_address+' (checking the network every '+str(DELAY)+' seconds)','gray')

def log_msg(msg):
    	print "%s: %s" % (strftime("%a, %d %b %Y %H:%M:%S", gmtime()), msg)

def fb_connect():
    	log_msg("Connecting to firebase")
    	authentication = firebase.FirebaseAuthentication(FIREBASE_TOKEN, FIREBASE_EMAIL)
    	fb = firebase.FirebaseApplication('https://disturbometer.firebaseio.com/', authentication)
    	return fb

def fb_retry(fb, url, data, seconds):
    	sleep(seconds)
    	try:
        	fb.post(url, data)
        	log_msg("Written to firebase")
    	except (requests.Timeout, requests.ConnectionError, requests.RequestException, requests.HTTPError) as e:
        	log_msg("fb_retry: Got an Exception: will retry in %d seconds. \n%s" % (int(seconds), e))
        	fb_retry(fb, url, data, seconds)

def fb_write(data):
	fb = fb_connect()
	url = '/events/nmapscans/'
	data['.priority'] = int(time())
	try:
		fb.post(url, data)
		log_msg("Written to firebase")
    	except (requests.Timeout, requests.ConnectionError, requests.RequestException, requests.HTTPError) as e:
        	log_msg("Writing Errors to Firebase: Got a Timeout: will retry in 60 seconds.\n%s" % e)
        	fb_retry(fb, url, data, 60)

# wait for internet access to be available
wait_for_access() 

# create a reference to the nmap port scanner
nm = nmap.PortScanner()

while True:
	nm.scan('192.168.10.*', arguments='-sP')
	
	# get current datetime
	now = datetime.datetime.now()
	
	macs = []

	for h in nm.all_hosts():
    		if 'mac' in nm[h]['addresses']:
			vendor = nm[h]['vendor']
			vendor_device = ''
			if vendor:
				vendor_device = nm[h]['vendor'][nm[h]['addresses']['mac']]
			# print nm[h]['addresses']['mac'], nm[h]['addresses']['ipv4'], vendor_device
			device_info = {
				'mac_address' : nm[h]['addresses']['mac'],
				'ip_address' : nm[h]['addresses']['ipv4'],
				'vendor' : vendor_device
			}
			# macs.append(nm[h]['addresses']['mac'])
			macs.append(device_info)

	# formulate a data object to send to firebase
	data = {
		'last_seen' : now,
		'mac_addresses' : macs
	}

	# write to firebase
	fb_write(data)

	# wait before continuing
	sleep(DELAY)
