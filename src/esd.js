function EtherScamDbValidateAddress()
{
    let addr = this.value.trim();

    //See if the div that we write the icon to exists
    if(!document.getElementById("esd-address-verify")) {
        //No div is created
        console.warn("div#esd-address-verify does not exist!");
        return;
    }

    if(!(new RegExp("^0x[a-fA-F0-9]{40}$").exec(addr))) {
        document.getElementById("esd-address-verify").innerHTML = "";
        return;
    }

    // We are loading...
    document.getElementById("esd-address-verify").innerHTML = `
        <svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    width="30.555px" height="50px" viewBox="0 0 609.555 1000" enable-background="new 0 0 609.555 1000" xml:space="preserve">
            <title>We are checking the address...</title>
            <g>
                <g>
                    <path fill="#DEDEDE" d="M9.337,557.712c5.979,20.553,13.911,40.265,23.809,58.8l-0.04,0.023l0.341,0.572
                                    c4.45,8.303,9.294,16.359,14.473,24.185L304.794,1000V733.475L9.337,557.712z"/>
                    <path fill="#D9D9D9" d="M304.794,733.475V1000l256.875-358.708c5.176-7.825,10.022-15.882,14.473-24.185l0.34-0.572l-0.039-0.023
                                    c9.895-18.535,17.832-38.247,23.806-58.8L304.794,733.475z"/>
                </g>
                <polygon fill="#D9D9D9" points="304.776,0 304.776,387.292 476.391,285.198 	"/>
                <path fill="#D9D9D9" d="M502.419,328.454l-4.897-8.177L396.74,380.242l-91.946,143.716l-0.015,163.935L609.555,506.57
                                L502.419,328.454z M381.535,559.258l86.699-134.769l34.045,60.231L381.535,559.258z"/>
                <polygon fill="#DEDEDE" points="304.779,687.893 0,506.57 107.139,328.454 112.036,320.277 212.794,380.225 304.741,523.944 	"/>
                <polygon fill="#DEDEDE" points="304.776,387.292 304.776,0 133.213,285.237 	"/>
            </g>
        </svg>
    `;

    fetch("https://etherscamdb.info/api/check/" + addr)
        .then((res) => res.json())
        .then((data) => {
            switch(data.result) {
                default:
                case 'neutral':
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
                    break;
                case 'blocked':
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
                    break;
                case 'whitelisted':
                    document.getElementById("esd-address-verify").innerHTML = `
                    <a href="https://etherscamdb.info/address/${addr}" target="_blank">
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
                    </a>
                    `;
                    break;
            }
        })
        .catch((err) => console.warn(err));
}