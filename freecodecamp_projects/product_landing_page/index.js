let features = [
    {
        'feature': 'Premium Materials',
        'description': ' Our trombones use the shiniest brass which is sourced locally. This will increase the longevity of your purchase. ',
        'icon': 'fas fa-fire'
    },
    {
        'feature': 'Fast Shipping',
        'description': ' We make sure you recieve your trombone as soon as we have finished making it. We also provide free returns if you are not satisfied. ',
        'icon': 'fas fa-truck'
    },
    {
        'feature': 'Quality Assurance',
        'description': ' For every purchase you make, we will ensure there are no damages or faults and we will check and test the pitch of your instrument. ',
        'icon': 'fas fa-battery-full'
    }
];

let trombone_types = [
    {
        'name': 'Tenor Trombone',
        'price': '$600',
        'description_text1': 'Lorem ipsum.',
        'description_text2': 'Lorem ipsum.',
        'description_text3': 'Lorem ipsum dolor.',
        'description_text4': 'Lorem ipsum.'
    },
    {
        'name': 'Bass Trombone',
        'price': '$900',
        'description_text1': 'Lorem ipsum.',
        'description_text2': 'Lorem ipsum.',
        'description_text3': 'Lorem ipsum dolor.',
        'description_text4': 'Lorem ipsum.'
    },
    {
        'name': 'Valve Trombone',
        'price': '$1200',
        'description_text1': 'Plays similar to a Trumpet',
        'description_text2': 'Great for Jazz Bands',
        'description_text3': 'Lorem ipsum dolor.',
        'description_text4': 'Lorem ipsum.'
    }
];

function _addHTMLContent(targetElemId, data, props, skip_props){
    props = props || Object.keys(data[0]);
    if(skip_props){
       props = props.filter((prop)=>{
            return !skip_props.includes(prop);
        });
    }
    let dt = document.querySelector(`section#${targetElemId} dl`);
    let htmlString = "";
    data.forEach(function(f){
        htmlString += '<dt>' + f[props[0]] + '</dt>';
        htmlString += '<dd>';
        for(let j=1;j<props.length; j++){
            htmlString += '<span>' + f[props[j]] + '</span>';
        }
        htmlString += '</dd>';
    });
    dt.innerHTML = htmlString;
}
function _addFeatures(){
    _addHTMLContent('features', features, null, ['icon']);
}

function _addTromboneTypes(){
    _addHTMLContent('pricing', trombone_types, null, ['price']);
}

// Add features with HTML in DOM
window.addEventListener('DOMContentLoaded', function(){
    _addFeatures();
    _addTromboneTypes();
});