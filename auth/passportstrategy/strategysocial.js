module.exports = (app, passport) => {

    //================= Social Auth
    const networks = ['google', 'facebook', 'vkontakte', 'linkedin'];
    networks.forEach(network => {

        app.get(`/registration/${network}`, (request, response) => {
            passport.authenticate(network, {
                scope:'email'
            })(request, response);
        });

        app.get(`/registration/${network}/callback`, (request, response) => {
            passport.authenticate(network, {
                successRedirect: '/auth-success',
                failureRedirect: '/auth-error'
            })(request, response);
        });
    });
};                                                                                                                           