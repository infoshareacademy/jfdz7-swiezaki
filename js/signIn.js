const $signInCbx = $('#sign-in-agreement');
const $sendBtn = $('#send-btn');
const $emailAddress = $('#sign-in-info');
const minEmailLength = 8;

function toggleSubmitBtnDisability() {

    $signInCbx.prop('checked') && $emailAddress.val().length > minEmailLength ?
        $sendBtn
            .prop('disabled', false)
            .removeClass('disabled')
            .addClass ('button') :
        $sendBtn
            .prop('disabled', true)
            .addClass('disabled')
            .removeClass('button')
}

$signInCbx.on('click', toggleSubmitBtnDisability);
$emailAddress.on('keyup', toggleSubmitBtnDisability);