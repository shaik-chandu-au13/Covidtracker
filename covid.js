$('#updates').submit(function(event) {
    event.preventDefault();

    console.log('event triggered');

    $.ajax({
        type:'GET',
        url: `https://api.covid19api.com/summary`,
        success: displayCovidData
    });
})

function displayCovidData(data, status) {
    let selectCountry = $('#selectCountry').val();
    console.log('selectCountry:',selectCountry);
    let all_countries = (data.Countries)
    all_countries.forEach(function(country) {
        if (country.Slug == selectCountry){
            console.log(country.TotalConfirmed)
            console.log(country)
            $('#output').html(`<div class="TCNF">Total confirmed: <b>${country.TotalConfirmed}</b></div>
            <div class="TDT">Total Deseased: <b>${country.TotalDeaths} </b></div>
            <div class="TRC">Total recovered: <b>${country.TotalRecovered} </b></div>
            <div class="NCNF">New confirmed: <b>${country.NewConfirmed} </b></div>
            <div class="NRC">New recovered: <b>${country.NewRecovered} </b></div>
            <div class="date">Last Updated at : <b>${country.Date.slice(0,10)} </b></div>`)

    }
    });
}
$(document).ready(function() {
    $.ajax({
        type:'GET',
        url: `https://api.covid19api.com/summary`,
        success: populateTheCountries
    });

})

function populateTheCountries(data, status) {
    let all_countries = (data.Countries)
    let selectCountry = $('#selectCountry');
    all_countries.forEach(function(country) {
        selectCountry.append(`<option value=${country.Slug}>${country.Country}</option>`)
    });
}