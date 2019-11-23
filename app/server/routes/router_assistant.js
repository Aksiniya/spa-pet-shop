module.exports = {
    HttpError: function (status, message, res) {
            if (res === undefined) {
                console.log(new Error('[ERROR]: Unable to send error message due to missing response reference.')); // log error
                return;
            }
            res.status(status);
            res.send({'error': message});
    },

    DatabaseError: function(err, res) {
        console.log('[DATABASE ERROR]:');
        console.log(err);
        HttpError(500, 'An DB-error has occurred', res);
    },

    OK: function (message, res) {
        if (res === undefined) {
            console.log(new Error('[ERROR]: Unable to send OK message due to missing response reference.')); // log error
            return;
        }
        res.status(200);
        res.send(message);
    },

};