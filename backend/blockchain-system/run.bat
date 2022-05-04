@echo off
:: Start Bootstrap node + Signer + Mining
start "Boot Node" cmd.exe /c geth --datadir node0 --networkid 23121123 --nat extip:127.0.0.1 --netrestrict 127.0.0.0/8 --ipcpath bootnode --syncmode "full" --unlock 0xf55d9461466fb665fc2929c1b95607288eaff900 --password pass.txt --mine

timeout 3

:: Save enr address boot node
start "Get enr Boot Node" cmd.exe /c "geth attach \\.\pipe\bootnode --exec admin.nodeInfo.enr > bootenr"

:: Get bootenr
set /p Bootenr=<bootenr

:: Start Node 1
start "Node 1" cmd.exe /c geth --datadir node1 --networkid 23121123 --port 30305 --syncmode "full"  --bootnodes %Bootenr%  --ipcpath node1 --netrestrict 127.0.0.0/8
    
timeout 1
:: Start Node 2
start "Node 2" cmd.exe /c geth --datadir node2 --networkid 23121123 --port 30307 --syncmode "full"  --bootnodes %Bootenr%  --ipcpath node2 --netrestrict 127.0.0.0/8
    
timeout 2
:: Start Node 3 + HTTP API
start "HTTP  " cmd.exe /c geth --datadir node3 --networkid 23121123 --port 30309 --syncmode "full" --bootnodes %Bootenr%  --ipcpath node3 --allow-insecure-unlock --http --http.addr 0.0.0.0 --http.api personal,eth,net,web3 --http.corsdomain "*"  --ws --ws.api eth,net,web3 --ws.origins "*" --netrestrict 127.0.0.0/8
