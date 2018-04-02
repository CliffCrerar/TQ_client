/* This file contains promises */

module.exports = class {

    createPartsList(funcLPSD, sortFilter, psExpander) {
        // LOAD PARTS LIST PROMISE
        Promise.resolve(funcLPSD, sortFilter, psExpander)
            .then(() => {
                sortFilter.sortItems($('#accordion'));
                // On click event for expanding parts listing
                $('.partListing').on('click', (ev) => {
                    var colLdd = window.collapsesLoaded.includes(ev.currentTarget.id);
                    if (!colLdd) {
                        Promise.resolve(psExpander.loadCollapsed(ev.currentTarget.id))
                            .then(() => {
                                window.collapsesLoaded.push(ev.currentTarget.id);
                                $('.like').on('click', (event) => {
                                    console.log('like');
                                    psExpander.clickLike(event);
                                });
                                $('.quote').on('click', (event) => {
                                    console.log('Quote');
                                    psExpander.clickQuote(event);
                                });

                            });

                    } else {
                        console.log('Collapse was loaded');
                    }
                    //console.log($(ev.target).attr('data-target'));
                    var collapseTarget = $(ev.target).attr('data-target');
                    //console.log($(collapseTarget).hasClass('show'));
                    if($(collapseTarget).hasClass('show')){
                        $(collapseTarget).collapse('hide');
                        $('#'+ev.target.id).find('.colapseInd').removeClass('fa-minus').addClass('fa-plus');
                    }else{
                        $(collapseTarget).collapse('show');
                        $('#'+ev.target.id).find('.colapseInd').removeClass('fa-plus').addClass('fa-minus');
                    }

                });

            });
        //LOAD PARTS LIST PROMISE
    }

};