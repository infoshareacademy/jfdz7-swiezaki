const $signInCbx = $('#sign-in-agreement');
const $sendBtn = $('#send-btn');
const $emailAddress = $('#sign-in-info');
const minEmailLength = 8;
const $startUpForm = $('#startup-sign-in-form');

const toggleSubmitBtnDisability = () => {

    $signInCbx.prop('checked') && $emailAddress.val().length > minEmailLength ?
        $sendBtn
            .prop('disabled', false)
            .removeClass('disabled')
            .addClass ('button') :
        $sendBtn
            .prop('disabled', true)
            .addClass('disabled')
            .removeClass('button')
};

const actionOnFormSubmit = () => {

    let emailStorage = localStorage.getItem('submittedEmails');

    if (emailStorage === null) {

        emailStorage = [];

    } else {

        emailStorage = JSON.parse(emailStorage);

    }

    emailStorage.push({ email: $emailAddress.val() });
    localStorage.setItem('submittedEmails', JSON.stringify(emailStorage));

    // console.log(emailStorage); // left commented for future email list check

    $startUpForm
        .attr('target','_blank')
        .attr('action','http://www.swiezaki.jfdz7.is-academy.pl/game')
        .submit()
};

$signInCbx.on('click', toggleSubmitBtnDisability);
$emailAddress.on('keyup', toggleSubmitBtnDisability);
$sendBtn.on('click', actionOnFormSubmit);