# Running SSL against Localhost servers ( HTTPS )

**Do not run this in production**

# Steps
## Root Certs
- Generate root CA private key ( rootCA.key )
```
openssl genrsa -des3 -out rootCA.key 2048
```
- Generate root CA certificate ( rootCA.pem )
```
openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 1024 -out rootCA.pem
```
- Trust generated root CA cert
    - Add rootCA.pem to keychain via File-> Import
    - Double click on the added pem and change 'Trust' settings to 'Always Trust'

## Domain Certs

- Create server.csr.cnf file ( For domain private key creation )
*See cert/server.csr.cnf*

- Create v3.ext file ( For domain certificate creation. Based on x509 )
*See cert/v3.ext*

- Generate Domain private key ( server.key )
```
openssl req -new -sha256 -nodes -out server.csr -newkey rsa:2048 -keyout server.key -config <( cat server.csr.cnf )
```
- Generate Domain certificate ( server.crt )
```
openssl x509 -req -in server.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out server.crt -days 500 -sha256 -extfile v3.ext
```
## Usage in Express server
*See index.js*
