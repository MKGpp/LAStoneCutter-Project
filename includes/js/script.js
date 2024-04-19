
/**
 * Populates the engravings menu with data from the JSON file.
 */
const populateMenu = () => {
    
    fetch('includes/data/engravings.json')
        .then(response => response.json())
        .then(engravings => {
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
        let checkedCheckboxes = $('#engravingMenu input[type="checkbox"]:checked');
        
        if (checkedCheckboxes.length >= 2) {
            $('#engravingMenu input[type="checkbox"]').not(':checked').prop('disabled', true);
        } else {
            $('#engravingMenu input[type="checkbox"]').prop('disabled', false);
        }
    });
});
