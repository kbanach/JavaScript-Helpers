# JavaScript Helpers

Project live preview on http://kbanach.github.io/JavaScript-Helpers


## Prepare environment*

### Mint Linux (probably all Debian-based)

Project uses SCSS files, so Ruby would be handy
```
sudo apt-get install ruby-dev
sudo gem install compass
```

Then the NodeJS (taken from [project webpage](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions))
```
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install nodejs
```

Our loved `npm` packages &#9829;
```
sudo npm install -g grunt-cli bower yo
```

And then, finally, in root directory of our project

```
npm install
bower install
```

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma. And yes, I have to fix ALL of them.

## Gnomes Inc. release notes

This project was generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.12.1.

Everything what you can see here, is a one-man-one-tomuchfreetime job. Don't blame me for anything. Ask questions.
Questions are good. Like chocolate.

If you want to add something into project or suggest some fuckup inside of it.
Then please write to banach.krystian at gmail. I promise I'll give you potato if you want one!

Slava.
