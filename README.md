# Server Remote

Power off or reboot your computer remotely. It is designed to support Windows, macOS, and linux, but I tested on Windows and linux.

This project originally developed for my home server. So there is no authentication or security functions. To be careful using this on public server.

## How to set up

1. Install `pm2`
```shell
npm install -g pm2@latest
```
2. Run `pm2`
```shell
pm2 start ecosystem.config.js
```
3. Done!

## How to use

1. Access `http(s)://[YOUR DOMAIN]:[YOUR PORT]`.
2. You can see below page
![Main page](/docs/page.png)
3. First button is power off, and second is reboot. So you can power off or reboot your computer remotely using these buttons.

> If you set up HTTPS, you can install this page as Progressive Web App.

## Contribution

All kind of contribution is welcome!

## License

You can use this repository under MIT License.