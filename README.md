# web-qr-generator

Easily generate QR code using an easy `HTTP GET` request.
This script was primarily made to run as a service on windows server to generate a QR code for Crystal Report using a dynamic image(See examples below) but can be used for any purpose.

This project is supported by [TAV Medical Ltd.](https://tavmedical.com)

## Installation

1. Download and install [Node.js](https://nodejs.org/en/).
2. [Fork](https://github.com/liorsh69/web-qr-generator/fork)/[Download](https://github.com/liorsh69/web-qr-generator/archive/master.zip)/[Git clone](https://help.github.com/articles/duplicating-a-repository/) this repository.
3. Run install.bat (just doing `npm install` to install dependencies).
4. Run using `node index.js` or Install as a service.
5. Open browser and go to `http://127.0.0.1:8080` or `http//YOUR-SERVER-IP:PORT`. (Getting an error at this point is normal - `ERROR - Parameter Required: data`)

### Install As A Service

1. Open a new command prompt window.
2. Run `npm run-script install-windows-service` to install a new service named `web-qr-generator`.
3. Open Services & start the service.

-   To uninstall run `npm run-script uninstall-windows-service`.

## Usage

http://127.0.0.1:8080?size=150&data=qrCodeTextOrLink

| Argument | Required? | Default Value | Details            |
| -------- | --------- | ------------- | ------------------ |
| size     |           | 150           | QR Code Image Size |
| data     | \*        | `none`        | QR Code Data       |

### Log File

All logs are being saved in `console.log` to allow easy debugging when running as a service.

### How To Use With Crystal Report

1. Create a default QR Code image and save it locally.
    - i.e: http://127.0.0.1:8080?size=200&data=TAVmedical-IT
2. Create or Edit a Crystal Report file.
3. Insert a new picture.
4. Right click the picture and select `Format Graphic...`
5. Open `picture` tab and edit `Graphic Location` (x-2 logo)

```javascript
// Using a SQL field
"http://127.0.0.1:8080/?size=300&data=" & {HEADER.FIELD1}

// Using JSON QR code with multiple SQL fields
stringVar json := "{'type':'mo','mo':'" &{HEADER.FIELD1}& "','pn':'" &{HEADER.FIELD2}& "','lot':'" &{HEADER.FIELD3}& "','com':'" &{HEADER.FIELD4}& "'}";

"http://127.0.0.1:8080/?size=300&data=" & json
```

## Contributing

When contributing to this repository, please **first discuss** the change you wish to make via **issue** or **email** before making a push.

-   When writing/rewriting make sure to comment with as much information as you can
-   Make sure to test as you write to prevent any errors
-   **Always** push to dev branch
-   If approved - the changes are going to get tested using dev branch

## Dependencies

-   [winston](https://github.com/winstonjs/winston)
-   [express](https://github.com/expressjs/express)
-   [qrcode](https://github.com/soldair/node-qrcode)
