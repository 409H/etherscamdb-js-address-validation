function EtherScamDbValidateAddress()
{
    let addr = this.value.trim();
    if(!(new RegExp("^0x[a-fA-F0-9]{40}$").exec(addr))) {
        console.warn("ESDB - Not a valid address: "+ addr);
        return;
    }

    fetch("https://etherscamdb.info/api/check/" + addr)
        .then((res) => res.json())
        .then((data) => {
            switch(data.result) {
                default:
                case 'neutral':
                    document.getElementById("esd-address-verify").innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:se="http://svg-edit.googlecode.com" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" style="width:50px;height:70px">
                            <title>This address has not been verified by EtherScamDB</title>
                            <g style="">
                                <rect fill="#6d6d6d" stroke="#222222" stroke-width="2" stroke-linejoin="round" stroke-dashoffset="" fill-rule="nonzero" x="1.5934143066406" y="6.26373291015625" width="37.71428680419922" height="16.39560317993164" style="color: rgb(0, 0, 0);" class="" rx="5" ry="5" fill-opacity="1"></rect>
                                <rect fill="#6d6d6d" stroke="#222222" stroke-width="2" stroke-linejoin="round" stroke-dashoffset="" fill-rule="nonzero" x="1.81317138671875" y="25.1648406982422" width="37.71428680419922" height="16.39560317993164" style="color: rgb(0, 0, 0);" rx="5" ry="5" fill-opacity="1"></rect>
                                <rect fill="#6d6d6d" stroke="#222222" stroke-width="2" stroke-linejoin="round" stroke-dashoffset="" fill-rule="nonzero" x="1.81317138671875" y="44.39559936523438" width="37.71428680419922" height="16.39560317993164" style="color: rgb(0, 0, 0);" class="" rx="5" ry="5" fill-opacity="1"></rect>
                                <foreignObject fill="#6d6d6d" stroke="#222222" stroke-width="2" stroke-linejoin="round" stroke-dashoffset="" fill-rule="nonzero" font-size="50" font-family="Georgia, serif" letter-spacing="0" word-spacing="0" marker-start="" marker-mid="" marker-end="" x="8.5164794921875" y="22.4945068359375" width="50" height="57" style="color: rgb(227, 235, 148);" stroke-opacity="1">
                                    <p xmlns="http://www.w3.org/1999/xhtml" style="border:none;outline:none;font-size:inherit;line-height:1em;padding:0;margin:0;">
                                        <span style="border:none;outline:none;font-size:inherit;line-height:1em;padding:0;margin:0;-webkit-text-stroke:1px #fff;">⚠</span>
                                    </p>
                                </foreignObject>
                            </g>
                        </svg>
                    `;
                    break;
                case 'blocked':
                    document.getElementById("esd-address-verify").innerHTML = `
                        <a href="https://etherscamdb.info/address/${addr}" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:se="http://svg-edit.googlecode.com" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" style="width:50px;height:70px">
                                <title>This address has been blacklisted by EtherScamDB</title>
                                <g style="">
                                    <rect fill="#6d6d6d" stroke="#222222" stroke-width="2" stroke-linejoin="round" stroke-dashoffset="" fill-rule="nonzero" x="1.5934143066406" y="6.26373291015625" width="37.71428680419922" height="16.39560317993164" style="color: rgb(0, 0, 0);" class="" rx="5" ry="5" fill-opacity="1"></rect>
                                    <rect fill="#6d6d6d" stroke="#222222" stroke-width="2" stroke-linejoin="round" stroke-dashoffset="" fill-rule="nonzero" x="1.81317138671875" y="25.1648406982422" width="37.71428680419922" height="16.39560317993164" style="color: rgb(0, 0, 0);" rx="5" ry="5" fill-opacity="1"></rect>
                                    <rect fill="#6d6d6d" stroke="#222222" stroke-width="2" stroke-linejoin="round" stroke-dashoffset="" fill-rule="nonzero" x="1.81317138671875" y="44.39559936523438" width="37.71428680419922" height="16.39560317993164" style="color: rgb(0, 0, 0);" class="" rx="5" ry="5" fill-opacity="1"></rect>
                                    <foreignObject fill="#6d6d6d" stroke="#222222" stroke-width="2" stroke-linejoin="round" stroke-dashoffset="" fill-rule="nonzero" font-size="50" font-family="Georgia, serif" letter-spacing="0" word-spacing="0" marker-start="" marker-mid="" marker-end="" x="14.5164794921875" y="18.4945068359375" width="50" height="57" style="color: rgb(173, 81, 60);" stroke-opacity="1">
                                        <p xmlns="http://www.w3.org/1999/xhtml" style="border:none;outline:none;font-size:inherit;line-height:1em;padding:0;margin:0;">
                                            <span style="border:none;outline:none;font-size:48pt;line-height:1em;padding:0;margin:0;-webkit-text-stroke:1px #fff;">⨯</span>
                                        </p>
                                    </foreignObject>
                                </g>
                            </svg>
                        </a>
                    `;
                    break;
                case 'verified':
                    document.getElementById("esd-address-verify").innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:se="http://svg-edit.googlecode.com" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" style="width:50px;height:70px">
                            <title>This address has been whitelisted by EtherScamDB</title>
                            <g style="">
                                <rect fill="#6d6d6d" stroke="#222222" stroke-width="2" stroke-linejoin="round" stroke-dashoffset="" fill-rule="nonzero" x="1.5934143066406" y="6.26373291015625" width="37.71428680419922" height="16.39560317993164" style="color: rgb(0, 0, 0);" class="" rx="5" ry="5" fill-opacity="1"></rect>
                                <rect fill="#6d6d6d" stroke="#222222" stroke-width="2" stroke-linejoin="round" stroke-dashoffset="" fill-rule="nonzero" x="1.81317138671875" y="25.1648406982422" width="37.71428680419922" height="16.39560317993164" style="color: rgb(0, 0, 0);" rx="5" ry="5" fill-opacity="1"></rect>
                                <rect fill="#6d6d6d" stroke="#222222" stroke-width="2" stroke-linejoin="round" stroke-dashoffset="" fill-rule="nonzero" x="1.81317138671875" y="44.39559936523438" width="37.71428680419922" height="16.39560317993164" style="color: rgb(0, 0, 0);" class="" rx="5" ry="5" fill-opacity="1"></rect>
                                <foreignObject fill="#6d6d6d" stroke="#222222" stroke-width="2" stroke-linejoin="round" stroke-dashoffset="" fill-rule="nonzero" font-size="50" font-family="Georgia, serif" letter-spacing="0" word-spacing="0" marker-start="" marker-mid="" marker-end="" x="14.5164794921875" y="22.4945068359375" width="50" height="57" style="color: rgb(60, 173, 85);" stroke-opacity="1">
                                    <p xmlns="http://www.w3.org/1999/xhtml" style="border:none;outline:none;font-size:inherit;line-height:1em;padding:0;margin:0;">
                                        <span style="border:none;outline:none;font-size:inherit;line-height:1em;padding:0;margin:0;">✓</span>
                                    </p>
                                </foreignObject>
                            </g>
                        </svg>
                    `;
                    break;
            }
        })
        .catch((err) => console.warn(err));
}