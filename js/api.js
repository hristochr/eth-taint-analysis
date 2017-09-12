/**
 * Created by Hristo on 03/08/2017.
 */

function getAddress() {
    let a = location.search&&location.search.substr(1).replace(/\+/gi," ").split("&");
    for (let i in a) {
        let s = a[i].split("=");
        a[i]  = a[unescape(s[0])] = unescape(s[1]);
    }
    let address = a[0];
    return address;
}

let address = getAddress();

let validAddress = address.length === 42 && address.substring(0,2) === "0x";
if (!validAddress) {
    $("#error").html('Invalid ETH address!');
    $("#result").html.clear();
}

function getTransactions(n) {
    let inputAddress = n;
    let api = "http://api.etherscan.io/api?module=account&action=txlist&address=" + inputAddress + "&startblock=0&endblock=99999999&sort=asc&apikey=TBDQTMNF5N3IWMAEQYJE4ZEI83RYQKTQCQ";
    $.getJSON(api, function(data){
        let value = data.result;
        let finalResult = "";
        let counter = 0;
        let totalTransactionvalue = 0;

        for(let i = 0; i < value.length; i++) {
            let addressFrom = value[i].from;
            let addressTo = value[i].to;
            let transActionValue = value[i].value  / 1000000000000000000;
            let plural = transActionValue > 1 || transActionValue < 1 ? "were" : "was";

            finalResult += transActionValue +
                " ETH " + plural + " sent to " +
                "<span class='addressTo'>" + addressTo + "</span>" +
                " from " +
                "<span class='addressTo'>" + addressFrom + "</span>" +
                "</br>" +
                "<div class='divider'></div>";

            if (addressFrom === inputAddress) {
                transActionValue = -Math.abs(transActionValue);
            }
            totalTransactionvalue += transActionValue;

            counter++;
        }
        $("#result").html(finalResult);
        $("#resultCounter").html("Total transactions: " + counter);
        $("#resultValue").html("Total value: " + totalTransactionvalue + " ETH");

    })
}

getTransactions(address);
