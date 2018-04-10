/* This file contains promises */

module.exports = class {

    createPartsList(funcLPSD, sortFilter, psExpander) {
        // LOAD PARTS LIST PROMISE
        Promise.resolve(funcLPSD, sortFilter, psExpander)
            .then(() => {
                sortFilter.sortItems($('#accordion'));
                // On click event for expanding parts listing
                $('.partListing').on('click', (ev) => {
                    var idSelect = '#'+ev.currentTarget.id;
                    console.log('currentTarget', ev.currentTarget.id);
                    console.log('Target', ev.target.id);
                    console.log(idSelect);
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
                    $('.colapseInd').each((i,el) => {
                        if($(el).hasClass('fa-minus')){
                            $(el).removeClass('fa-minus').addClass('fa-plus');
                        }
                    });
                    var collapseTarget = $(ev.currentTarget).attr('data-target');
                    //console.log($(collapseTarget).hasClass('show'));
                    if($(collapseTarget).hasClass('show')){
                        $(collapseTarget).collapse('hide');
                        $(idSelect).find('.colapseInd').removeClass('fa-minus').addClass('fa-plus');
                    }else{
                        $(collapseTarget).collapse('show');
                        console.log('#'+ev.target.id);
                        $(idSelect).find('.colapseInd').removeClass('fa-plus').addClass('fa-minus');
                    }

                });

            });
        //LOAD PARTS LIST PROMISE
    }

};