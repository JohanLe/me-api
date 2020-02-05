var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: "Mitt namn är Johan Ledel, 27år gammal. Bor I halmstad" +
                " och läser Webbprogrammering på BTH på Distans sedan hösten 2018.\n" +
                "När jag inte studerar eller arbetar på Clas Ohlson spenderar" +
                " jag mycket tid på golfbanan. Mycket av min tid och planering" +
                " av gym träning går till att förbättra min golf även om det bara" +
                " är på en hobby nivå. Målet är att komma ner under 4hcp innan" +
                " säsongen 2021 är över."
        }
    };

    res.json(data);
});

module.exports = router;