#!/usr/bin/env bash

echo ">>> Starting Install Script"

echo ">>> Installing Node"
wget --quiet http://nodejs.org/dist/v0.12.2/node-v0.12.2-linux-x64.tar.gz
sudo tar -C /usr/local --strip-components 1 -xzf node-v0.12.2-linux-x64.tar.gz

echo ">>> Install Script Completed"
