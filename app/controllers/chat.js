module.exports.iniciarChat = function (application, req, res) {
    req.assert('apelido', 'Nome ou apelido é obrigatório!').notEmpty();
    req.assert('apelido', 'Nome ou apelido deve conter entre 3 a 15 caracteres').len(3, 15);

    var validation = req.validationErrors();

    if (validation) {
        res.render('index', { validation : validation } );
        return;
    }

    application.get('io').emit(
        'msgParaCliente',
        {apelido: req.body.apelido, mensagem: 'acabou de entrar no chat'}
    );

    res.render('chat', { apelido : req.body.apelido } );
}