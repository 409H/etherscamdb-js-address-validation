function EtherScamDbValidateAddress()
{
    let addr = this.value.trim();

    //See if the div that we write the icon to exists
    if(!document.getElementById("esd-address-verify")) {
        //No div is created
        console.warn("div#esd-address-verify does not exist!");
        return;
    }

    // See if the value is a valid Ethereum address
    if(!(new RegExp("^0x[a-fA-F0-9]{40}$").exec(addr))) {
        document.getElementById("esd-address-verify").innerHTML = "";
        return;
    }

    //See if the config exits
    if(typeof window.ESDVAConfig === 'undefined') {
        var ESDVAConfig = {
            "localstorage": {
                "use": false,
                "iden": "esdb-cache"
            }
        };
    } else {
        var ESDVAConfig = window.ESDVAConfig;
    }

    //Check the localstorage before we check ESDB API
    let arrLocalCache = {
        "b": [],    //Blacklisted addresses
        "v": []     //Verified addresses
    };

    if(ESDVAConfig.localstorage.use) {

        if(localStorage.getItem(ESDVAConfig.localstorage.iden)) {
            arrLocalCache = JSON.parse(localStorage.getItem(ESDVAConfig.localstorage.iden));
        }

        if(arrLocalCache.b.length) {
            //Check the blacklist local cache
            if(arrLocalCache.b.indexOf(addr) >= 0) {
                //Address is blacklisted locally
                blacklist();
                return;
            }
        }

        if(arrLocalCache.v.length) {
            //Check the verified local cache
            if(arrLocalCache.v.indexOf(addr) >= 0) {
                //Address is verified locally
                verified();
                return;
            }
        }
    }

    fetch("https://etherscamdb.info/api/check/" + addr)
        .then((res) => res.json())
        .then((data) => {
            switch(data.result) {
                default:
                case 'neutral':
                        neutral();
                    break;
                case 'blocked':
                        arrLocalCache.b.push(addr);
                        if(ESDVAConfig.localstorage.use) {
                            localStorage.setItem(ESDVAConfig.localstorage.iden, JSON.stringify(arrLocalCache));
                        }
                        blacklist();
                    break;
                case 'verified':
                        arrLocalCache.v.push(addr);
                        if(ESDVAConfig.localstorage.use) {
                            localStorage.setItem(ESDVAConfig.localstorage.iden, JSON.stringify(arrLocalCache));
                        }
                        verified();
                    break;
            }
        })
        .catch((err) => console.log(err));

    function blacklist()
    {
        document.getElementById("esd-address-verify").innerHTML = `
            <a href="https://etherscamdb.info/address/${addr}" target="_blank">
                <svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="30.555px" height="50px" viewBox="0 0 609.555 1000" enable-background="new 0 0 609.555 1000" xml:space="preserve">
                    <title>This address has been blacklisted by EtherScamDB</title>
                    <g>
                        <g>
                            <path fill="#BD1327" d="M9.337,557.712c5.979,20.553,13.911,40.265,23.809,58.8l-0.04,0.023l0.341,0.572
                                c4.45,8.303,9.294,16.359,14.473,24.185L304.794,1000V733.475L9.337,557.712z"/>
                            <path fill="#801F35" d="M304.794,733.475V1000l256.875-358.708c5.176-7.825,10.022-15.882,14.473-24.185l0.34-0.572l-0.039-0.023
                                c9.895-18.535,17.832-38.247,23.806-58.8L304.794,733.475z"/>
                        </g>
                        <polygon fill="#801F35" points="304.776,0 304.776,387.292 476.391,285.198 	"/>
                        <path fill="#801F35" d="M502.419,328.454l-4.897-8.177L396.74,380.242l-91.946,143.716l-0.015,163.935L609.555,506.57
                            L502.419,328.454z M381.535,559.258l86.699-134.769l34.045,60.231L381.535,559.258z"/>
                        <polygon fill="#BD1327" points="304.779,687.893 0,506.57 107.139,328.454 112.036,320.277 212.794,380.225 304.741,523.944 	"/>
                        <polygon fill="#BD1327" points="304.776,387.292 304.776,0 133.213,285.237 	"/>
                    </g>
                </svg>
            </a>
        `;
    }

    function neutral()
    {
        document.getElementById("esd-address-verify").innerHTML = `
        <svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="30.555px" height="50px" viewBox="0 0 609.555 1000" enable-background="new 0 0 609.555 1000" xml:space="preserve">
            <title>This address has not been verified EtherScamDB</title>
            <g>
                <g>
                    <path fill="#505461" d="M9.337,557.712c5.979,20.553,13.911,40.265,23.809,58.8l-0.04,0.023l0.341,0.572
                        c4.45,8.303,9.294,16.359,14.473,24.185L304.794,1000V733.475L9.337,557.712z"/>
                    <path fill="#282138" d="M304.794,733.475V1000l256.875-358.708c5.176-7.825,10.022-15.882,14.473-24.185l0.34-0.572l-0.039-0.023
                        c9.895-18.535,17.832-38.247,23.806-58.8L304.794,733.475z"/>
                </g>
                <polygon fill="#282138" points="304.776,0 304.776,387.292 476.391,285.198 	"/>
                <path fill="#282138" d="M502.419,328.454l-4.897-8.177L396.74,380.242l-91.946,143.716l-0.015,163.935L609.555,506.57
                    L502.419,328.454z M381.535,559.258l86.699-134.769l34.045,60.231L381.535,559.258z"/>
                <polygon fill="#505461" points="304.779,687.893 0,506.57 107.139,328.454 112.036,320.277 212.794,380.225 304.741,523.944 	"/>
                <polygon fill="#505461" points="304.776,387.292 304.776,0 133.213,285.237 	"/>
            </g>
        </svg>
        `;
    }

    function verified()
    {
        document.getElementById("esd-address-verify").innerHTML = `
        <svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="30.555px" height="50px" viewBox="0 0 609.555 1000" enable-background="new 0 0 609.555 1000" xml:space="preserve">
            <title>This address has been verified by EtherScamDB</title>
            <g>
                <g>
                    <path fill="#1F8027" d="M9.337,557.712c5.979,20.553,13.911,40.265,23.809,58.8l-0.04,0.023l0.341,0.572
                        c4.45,8.303,9.294,16.359,14.473,24.185L304.794,1000V733.475L9.337,557.712z"/>
                    <path fill="#1F8021" d="M304.794,733.475V1000l256.875-358.708c5.176-7.825,10.022-15.882,14.473-24.185l0.34-0.572l-0.039-0.023
                        c9.895-18.535,17.832-38.247,23.806-58.8L304.794,733.475z"/>
                </g>
                <polygon fill="#1F8021" points="304.776,0 304.776,387.292 476.391,285.198 	"/>
                <path fill="#1F8021" d="M502.419,328.454l-4.897-8.177L396.74,380.242l-91.946,143.716l-0.015,163.935L609.555,506.57
                    L502.419,328.454z M381.535,559.258l86.699-134.769l34.045,60.231L381.535,559.258z"/>
                <polygon fill="#1F8027" points="304.779,687.893 0,506.57 107.139,328.454 112.036,320.277 212.794,380.225 304.741,523.944 	"/>
                <polygon fill="#1F8027" points="304.776,387.292 304.776,0 133.213,285.237 	"/>
            </g>
        </svg>
        `;
    }
}