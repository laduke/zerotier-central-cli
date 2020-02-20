# Zerotier Central CLI

Command Line Interface to my.zerotier.com

I'm still experimenting with how I want it to work. 

## install
npm i -g @laduke/zerotier-central cli

## usage
there's help so
`ztc help`

### examples
`ztc setup` (so you don't have to put your api token every time)

`ztc network:list`

`ztc member:list 6ab565387a82c205 --filter=online=true --sort=creation-time --columns="node-id,name,ip-assignments"`




