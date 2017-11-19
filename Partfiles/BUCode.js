                                
                $.getScript('https://rawgit.com/CliffCrerar/PartSales/Br1/KTM_Parts.js', function(){   
                    displayParts(KTM_Parts,'bikeParts','ktm');
                });

                $.getScript('https://rawgit.com/CliffCrerar/PartSales/Br1/BMW_Parts.js', function(){
                    displayParts(BMW_parts,'bikeParts','bmw');
                });

                $.getScript('https://rawgit.com/CliffCrerar/PartSales/Br1/LRDef_parts.js', function(){
                    displayParts(LRDef_parts,'Parts4x4','LandRover');
                });
                
                $.getScript('https://rawgit.com/CliffCrerar/PartSales/Br1/LRDisc_parts.js', function(){
                    displayParts(LRDisc_parts,'Parts4x4','LandRover');
                });

                $.getScript('https://rawgit.com/CliffCrerar/PartSales/Br1/TopBox_Panniers.js', function(){
                    displayParts(TopBoxPannier,'TopBoxPannierParts','Tob boxes and Panniers')
                });