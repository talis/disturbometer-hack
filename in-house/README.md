# Network scan script

This python script uses the python-nmap library to scan the network and get the MAC addresses of all connected devices. These are then posted up to a Firebase database.

You must have an accompanying config file that is located in either the users home directory ```~/netscan``` and/or ```etc/netscan```.

The format of the config file is as follows:

```
[NetScan]
delay=60

[Firebase]
token=<firebase token>
email=<firebase email>

[HipChat]
token=<hipchat token>
roomid=<hipchat room id>
```

Hipchat is used by the scan tool to post messages such as the IP address of the device that is running the scan tool itself so you have an idea what to SSH into if
you need to.