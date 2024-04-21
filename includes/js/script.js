
/**
 * Populates the engravings menu with data from the JSON file.
 */
let engravingJSON;
const populateMenu = () => {
    
    fetch('includes/data/engravings.json')
        .then(response => response.json())
        .then(engravings => {
            engravingJSON = engravings;
            let engravingHTML = '';
            engravings.forEach(engraving => {
                engravingHTML += `
                                    <div class="list-group-item col" data-bs-toggle="tooltip" data-bs-placement="top" title="${engraving.desc}">            
                                        <input class="form-check-input" type="checkbox" value="" id="${engraving.id}">
                                        <label class="form-check-label stretched-link" for="${engraving.id}">
                                            <img src="${engraving.Icon}" alt="${engraving.Name}" id="${engraving.imgID}" style="width: 40px; border-radius: 50%;"> ${engraving.Name}
                                        </label>
                                    </div>
                                 `;
            });
            $('#engravingMenu').html(engravingHTML);
            $('[data-bs-toggle="tooltip"]').tooltip({
                trigger: 'hover',
                html: true
            });
        })
        .catch(error => {
            console.error('Error fetching engravings data: ', error);
        });
}
populateMenu(); //calls the above function displaying engraving options.
/**
 * Checks the engravings checkboxes and if two are checked disables the rest.
 */
$(document).ready(() => {
    $('#engravingMenu').on('change', 'input[type="checkbox"]', () => {
        let engravingChecked = $('#engravingMenu input[type="checkbox"]:checked');
        
        if (engravingChecked.length === 2) {
            $('#engravingMenu input[type="checkbox"]').not(':checked').prop('disabled', true);
            console.log(engravingChecked[0].id);
            console.log(engravingChecked[1].id);
            return engravingChecked;
        } else {
            $('#engravingMenu input[type="checkbox"]').prop('disabled', false);
        }
    });
});

$('#start').on('click', () => {
    $('#stoneUI1').show();
    $('#stoneUI2').show();
    $('#stoneUI3').show();

    if (!engravingJSON) {
        console.error('Engraving data not available');
        return;
    }

    const idOne = $('#engravingMenu input[type="checkbox"]:checked').eq(0).attr('id');
    const idTwo = $('#engravingMenu input[type="checkbox"]:checked').eq(1).attr('id'); 

    const matchOne = engravingJSON.find(engraving => engraving.id === idOne);
    const matchTwo = engravingJSON.find(engraving => engraving.id === idTwo);

    if (matchOne && matchTwo) {
        cuttingUI(matchOne, matchTwo);
    } else {
        console.error("engraving not found");
    }
});


let successCount1 = 0;
let successCount2 = 0;
let failCount = 0;
let successRate = 75;
let failRate = 25;

/**
 * Populate the cutting interface with the passed data from the selected engravings
 * @param {*} matchOne 
 * @param {*} matchTwo 
 */
const cuttingUI = (matchOne, matchTwo) => {

    $('#successRate').html(`Success Rate: ${successRate}%`);
    $('#uiImg1').attr('src', matchOne.Icon).attr('alt', matchOne.Name);
    $('#name1').html(`${matchOne.Name}`);
    $('#successCount1').html(`${successCount1}`);


    $('#uiImg2').attr('src', matchTwo.Icon).attr('alt', matchTwo.Name);
    $('#name2').html(`${matchTwo.Name}`);
    $('#successCount2').html(`${successCount2}`);

    $('#failRate').html(`Failure Rate: ${failRate}%`)
    $('#failCount').html(`${failCount}`);

}

const orbDiv1 = $('#orbs1');
const orbDiv2 = $('#orbs2');
const orbDiv3 = $('#orbs3');

/**
 * redisplays the chance to succeed and fail on the UI.
 */
const updateRates = () => {
    $('#successRate').html(`Success Rate: ${successRate}%`);
    $('#failRate').html(`Failure Rate: ${failRate}%`);
}

/**
 * updates the given values for success and failure depending on the outcome.
 * @param {*} isSuccess 
 */
const updateSuccessRate = (isSuccess) => {
    if (isSuccess) {
        if (successRate > 25) {
            successRate -= 10;
            failRate += 10;
        }
    } else {
        if (successRate < 75) {
            successRate += 10;
            failRate -= 10;
        }
    }
}

$('#orbFill1').on('click', () => {
    if (clickCount1 < 10) {
        clickCount1++;
        updateButtonState();
        const orbs = orbDiv1.find('.orbs1');
        const chance = Math.floor(Math.random() * 100);

        if (chance < successRate) {
            successCount1++;
            fillOrbs(orbs);
            updateSuccessRate(true);
            $('#successCount1').html(`${successCount1}`);
        } else {
            updateSuccessRate(false);
        }
        updateRates();
    }
});

$('#orbFill2').on('click', () => {
    if (clickCount2 < 10) {
        clickCount2++;
        updateButtonState();
        const orbs = orbDiv2.find('.orbs2');
        const chance = Math.floor(Math.random() * 100);

        if (chance < successRate) {
            successCount2++;
            fillOrbs(orbs);
            updateSuccessRate(true);
            $('#successCount2').html(`${successCount2}`);
        } else {
            updateSuccessRate(false);
        }
        updateRates();
    }
});

$('#orbFill3').on('click', () => {
    if (clickCount3 < 10) {
        clickCount3++;
        updateButtonState();
        const orbs = orbDiv3.find('.orbs3');
        const chance = Math.floor(Math.random() * 100);

        if (chance < successRate) {
            failCount++;
            fillOrbs(orbs);
            updateSuccessRate(true);
            $('#failCount').html(`${failCount}`);
        } else {
            updateSuccessRate(false);
        }
        updateRates();
    }
});

let lastFilled = -1;

const fillOrbs = (orbs) => {
    orbs.each((index, orb) => {
        if (!$(orb).hasClass('filled') && index > lastFilled) {
            $(orb).addClass('filled');
            lastFilled = index;
            return false;
        }
    });
}

for (let i = 0; i < 10; i++) {
    const orb1 = $('<div>').addClass('orbs1');
    const orb2 = $('<div>').addClass('orbs2');
    const orb3 = $('<div>').addClass('orbs3');

    orbDiv1.append(orb1);
    orbDiv2.append(orb2);
    orbDiv3.append(orb3);
}

let clickCount1 = 0;
let clickCount2 = 0;
let clickCount3 = 0;

const updateButtonState = () => {
    if (clickCount1 >= 10) {
        $('#orbFill1').prop('disabled', true);
    }
    if (clickCount2 >= 10) {
        $('#orbFill2').prop('disabled', true);
    }
    if (clickCount3 >= 10) {
        $('#orbFill3').prop('disabled', true);
    }
}