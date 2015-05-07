
exec { newrelic-download-node:
  creates => "/home/vagrant/node-v0.12.2-linux-x64.tar.gz",
  command => "/usr/bin/wget -O /home/vagrant/node-v0.12.2-linux-x64.tar.gz http://nodejs.org/dist/v0.12.2/node-v0.12.2-linux-x64.tar.gz",

}

exec { newrelic-install-node:
  command => "/bin/tar -C /usr/local --strip-components 1 -xzf /home/vagrant/node-v0.12.2-linux-x64.tar.gz",
  user => root,
  subscribe => Exec["newrelic-download-node"],
}