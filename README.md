### EtherScamDb JS Address Validation Package

This package will check [EtherScamDb](https://etherscamdb.info) to get the status of an address to see if it's; blacklisted, whitelisted, neutral (unverified).

I've tried to make it as frictionless as possible for integration. So there's only 2 lines of code you need (other than requiring the package)

1) Add the div where you want the verification icon to appear

```html
<div id="esd-address-verify"></div>
```

2) Add an event listener to the input for the destination address

```js
document.getElementById("send_to_address").addEventListener('keyup', EtherScamDbValidateAddress);
```

_(The icons are a work in progress :|)_