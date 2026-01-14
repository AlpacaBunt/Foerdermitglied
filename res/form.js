/*
 * Synchronize form fields in screenParentId whose "name" attribute starts with
 * screenPrefix to their counterparts in printParentId (same "name" attribute
 * minus screenPrefix).
 *
 * "select" elements are synchronized to "text" inputs in printParentId.
 */
function syncFormFields (screenParentId, printParentId, screenPrefix) {
    var screenParent = document.getElementById(screenParentId);
    var printParent  = document.getElementById(printParentId);

    var inputs = screenParent.querySelectorAll(`input[name^="${screenPrefix}"]`);
    inputs.forEach(function (source) {
        var name = source.name.substring(screenPrefix.length);
        var selector;

        if (source.type === 'number') {
            selector = `input[type="text"][name="${name}"]`;
        } else {
            selector = `[name="${name}"]`;
        }

        syncElement(source, printParent, selector);
    });

    var selects = screenParent.querySelectorAll(`select[name^="${screenPrefix}"]`);
    selects.forEach(function (source) {
        var name = source.name.substring(screenPrefix.length);
        syncElement(source, printParent, `[name="${name}"]`);
    });

    var textareas = screenParent.querySelectorAll(`textarea[name^="${screenPrefix}"]`);
    textareas.forEach(function (source) {
        var name = source.name.substring(screenPrefix.length);
        syncElement(source, printParent, `[name="${name}"]`);
    });
}

/*
 * Synchronize the value or checked state of the source element to the
 * selector-chosen element in parent.
 */
function syncElement (source, parent, selector) {
    var target = parent.querySelector(selector);
    if (!target) {
        console.warn(`No match for selector "${selector}"`);
        return;
    }
    if (source.tagName === 'INPUT') {
        switch (source.type) {
            case 'checkbox':
            case 'radio':
                target.checked = source.checked;
                break;
            default:
                target.value = source.value;
                break;
        }
    } else {
        target.value = source.value;
    }
}
