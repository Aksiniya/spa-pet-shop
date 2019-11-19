module.exports = {
    HttpError: function (status, message, res) {
            if (res === undefined) {
                console.log(new Error('[ERROR]: Unable to send error message due to missing response reference.')); // log error
                return;
            }
            res.status(status);
            res.send({'error': message});
    },

    OK: function (message, res) {
        if (res === undefined) {
            console.log(new Error('[ERROR]: Unable to send OK message due to missing response reference.')); // log error
            return;
        }
        res.status(200);
        res.send({'answer': message});
    },

    Created: function (message, id, res) {
        if (res === undefined) {
            console.log(new Error('[ERROR]: Unable to send CREATED message due to missing response reference.')); // log error
            return;
        }
        res.status(201);
        res.send({'answer' : message, 'id' : id});
    }


};