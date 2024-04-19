

const populateMenu = () => {
    
    fetch('includes/data/engravings.json')
        .then(response => response.json())
        .then(data => {
            let engravings = data;
            let engravingHTML = '';
            engravings.forEach(engraving => {
                engravingHTML += `
                                    <div class="list-group-item col" data-bs-toggle="tooltip" data-bs-placement="top" title="${engraving.desc}">            
                                        <input class="form-check-input me-1" type="checkbox" value="" id="${engraving.id}">
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
populateMenu();