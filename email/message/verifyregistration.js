
module.exports = htmlMessageAuthorization = (url,user,token) => {
    return (
      `<div style="text-align: center">` +
      `<p>Здравствуйте, ${user.name + ' ' + user.lastname}<br/>` +
      'Благодарим Вас за регистрацию на сайте <a href="https://edmed.online">edmed.online</a><br/>' +
      'Чтобы завершить регистрацию, перейдите по ссылке:<br/>' +
      `${url}/auth/verufyregistration?jwt=${token}&email=${user.email}</p></div>`
    );
};