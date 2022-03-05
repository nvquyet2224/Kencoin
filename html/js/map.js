

var byClick = false;
var markers = [];
var centerInfo = [];
var map = null;
var goCenter = false;
var locations = null;

var currentLocations = null;


var locationCitys = {
    'HCM': [
        {
            districtId: 1337, // quan 2
            storeid: 1,
            lat: 10.801442,
            lng: 106.7471458,
            name: 'VNVC CANTAVIL AN PHÚ',
            address: '1 Song Hành, An Phú, Quận 2, Thành phố Hồ Chí Minh, Vietnam',
            phone: '028 3823 0352',
            workdate: 'Thứ 2 - Chủ Nhật',
            worktime: '8h00 - 17:00'
        },
        {
            districtId: 1320, // quan 10
            storeid: 2,
            lat: 10.7806193,
            lng: 106.6605148,
            name: 'Bệnh viện Đa Khoa Bưu Điện',
            address: 'Bệnh viện Đa Khoa Bưu Điện, Đường Thành Thái, Cư xá Bắc Hải, Phường 14, District 10, Ho Chi Minh City, Vietnam',
            phone: '028 3823 0352',
            workdate: 'Thứ 2 - Chủ Nhật',
            worktime: '8h00 - 17:00'
        }, {
            districtId: 1352, // tan phu
            storeid: 3,
            lat: 10.7899544,
            lng: 106.6397284,
            name: 'VNVC TÂN PHÚ',
            address: 'YASA Fitness Center (Lầu 1, Oriental Plaza), 685 Âu Cơ, Phường Tân Thành, Tân Phú, Ho Chi Minh City, Vietnam',
            phone: '028 7300 6595',
            workdate: 'Thứ 2 - Chủ Nhật',
            worktime: '8h00 - 17:00'
        }
    ],
    'DONGNAI': [
        {
            districtId: 1382, // Long Thanh
            storeid: 1,
            lat: 10.946987,
            lng: 106.8575368,
            name: 'VNVC ĐỒNG NAI',
            address: '22 Đoàn Văn Cự, Tam Hiệp, Thành phố Biên Hòa, Dong Nai, Vietnam',
            phone: '028 3823 0352',
            workdate: 'Thứ 2 - Chủ Nhật',
            worktime: '8h00 - 17:00'
        },
        {
            districtId: 1520, // Long Thanh
            storeid: 2,
            lat: 10.793489,
            lng: 106.9460342,
            name: 'VNVC LONG THÀNH',
            address: '115b Lê Duẩn, An Phước, Long Thành, Đồng Nai, Vietnam',
            phone: '028 3823 0352',
            workdate: 'Thứ 2 - Chủ Nhật',
            worktime: '8h00 - 17:00'
        }
    ]
}

var citys = {
    'HCM': [
        {
            districtId: 1337, // Quan 2
            name: 'Quận 2'
        }, {
            districtId: 1320, // Quan 2
            name: 'Quận 10'
        }, {
            districtId: 1352, // tan phu
            name: 'Quận Tân Phú'
        }
    ],
    'DONGNAI': [
        {
            districtId: 1382, // Bien Hoa
            name: 'Thành phố Biên Hòa'
        },
        {
            districtId: 1520, // Long Thanh
            name: 'Huyện Long Thành'
        }
    ]

}


function initMap() {

    var Center = new google.maps.LatLng(10.823099, 106.629664);

    var styles = [
        /*{
            stylers: [
                { hue: "#929292" },
                { saturation: -100 }
            ]
        }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                { lightness: -5 },
                { visibility: "simplified" }
            ]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [
                { visibility: "on" }
            ]
        }*/
    ];

    var styledMap = new google.maps.StyledMapType(styles, { name: "Styled Map" });

    var mapOptions = {
        center: Center,
        zoom: 11,
        //scrollwheel: true,
        mapTypeControl: false,
        clickableIcons: false,
        gestureHandling: 'cooperative',
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style'],
            position: google.maps.ControlPosition.TOP_RIGHT
            //position: google.maps.ControlPosition.TOP_LEFT
        }
    };

    google.maps.event.addDomListener(window, "resize", function () { });

    map = new google.maps.Map(document.getElementById(mapId), mapOptions);
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
}

function centerMap(lat, long) {
    var center = new google.maps.LatLng(lat, long);
    map.setCenter(center);
}

var storeList = "";
var logo = './images/marker.png';
var mapId = 'map';

function removeMarsker() {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

function findLocation() {

    removeMarsker();
    markers = [];
    storeList = "";
    var infowindow = new google.maps.InfoWindow();

    //Tạo mảng marker
    for (var i = 0; i < locations.length; i++) {


        //This code for info on map
        var name1 = '',
            address = '',
            phone = '',
            time = '';

        var name2 = '',
            address2 = '',
            phone2 = '',
            time2 = '';


        if (locations[i].name !== null && locations[i].name !== '') {
            name1 = `<h3>${locations[i].name}</h3>`;
            name2 = `<h4>${locations[i].name}</h4>`;
        }

        if (locations[i].address !== null && locations[i].address !== '') {
            address = `<p>${locations[i].address}</p>`;
            address2 = `<div class='item__address'><p>${locations[i].address}</p></div>`;
        }
        if (locations[i].phone !== null && locations[i].phone !== '') {
            phone = `<p class='fs-phone'>${locations[i].phone}</p>`;
            phone2 = `<div class='item__phone'><a href='tel:${locations[i].phone}'>${locations[i].phone}</a></div>`;
        }

        // Date && Time
        if ((locations[i].workdate !== null && locations[i].workdate !== '') &&
            (locations[i].worktime !== null && locations[i].worktime !== '')) {
            time = `<p>${locations[i].workdate} <br> ${locations[i].worktime}</p>`;
            time2 = `<div class='item__open'>
                        <div class='item__action'>
                            <div class='item__date'>${locations[i].workdate}</div>
                            <div class='item__hour'>${locations[i].worktime}</div>
                        </div>
                </div>`;
        }
        if ((locations[i].workdate !== null && locations[i].workdate !== '') &&
            (locations[i].worktime === null || locations[i].worktime === '')) {
            time = `<p>${locations[i].workdate}</p>`;

            time2 = `<div class='item__open'>
                    <div class='item__action'>
                        <div class='item__date'>${locations[i].workdate}</div>
                    </div>
            </div>`;
        }
        if ((locations[i].workdate === null && locations[i].workdate === '') &&
            (locations[i].worktime !== null && locations[i].worktime !== '')) {
            time = `<p>${locations[i].worktime}</p>`;

            time2 = `<div class='item__open'>
                    <div class='item__action'>
                        <div class='item__hour'>${locations[i].worktime}</div>
                    </div>
            </div>`;
        }

        var infobox = `<div class='fs-box store-info' data-store="${locations[i].storeid}">
                <div class='fs-area-txt'>
                    ${name1}
                    ${address}
                </div>
                <div class='fs-area-pic'>
                    ${time}
                    ${phone}
                </div>
            </div>`;

        var marker = new google.maps.Marker({
            storeid: locations[i].storeid,
            position: {
                lat: locations[i].lat,
                lng: locations[i].lng
            },
            icon: logo,
            map: map,
            animation: google.maps.Animation.DROP,
            info: infobox
        });

        marker.addListener('click', function () {
            infowindow.setContent(this.info);
            infowindow.open(map, this);
            map.panTo(this.position);
        });
        markers.push(marker);

    }

}

function getMarkerById(id) {
    var marker = null;
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].storeid == id) {
            marker = markers[i];
            break;
        }
    }

    return marker;

}

function getDistrictByCity(city) {
    var districts = citys[city];
    $('.district__select .fs__select__box ul').html('');
    var districtHtml = '';
    for (var i = 0; i < districts.length; i++) {
        districtHtml += `<li data-value="${districts[i].districtId}">${districts[i].name}</li>`;
    }
    $('.district__select .fs__select__box ul').html(districtHtml);
}


// Page Ready
(function () {

    // Open select
    $(document).on('click', '.select__header', function (e) {
        var box = $(this).parent();
        if (box.hasClass('select__open')) {
            box.removeClass('select__open');
        } else {
            $('.fs__select').removeClass('select__open');
            box.addClass('select__open');

            if (window.innerWidth > 1100) {
                $(box).find('ul').niceScroll({
                    autohidemode: false,
                    horizrailenabled: false,
                    cursorborder: "0px solid #fff",
                    cursorwidth: "6px",
                    cursorcolor: "#EDEDED",
                    background: "#ffffff",
                });
                $(box).find('ul').getNiceScroll().resize();
            } else {
                $(box).find('ul').getNiceScroll().remove();
            }

        }


    });

    $(document).on('click', '.fs__select__box li', function (e) {
        var that = $(this);
        var box = $(this).parent().parent().parent();
        var target = $(this).attr('data-value');

        if (!that.hasClass('selected')) {
            box.find('li').removeClass('selected');
            that.addClass('selected');
            box.removeClass('select__open');

            box.find('.select__input').val(that.text());
            box.find('li').removeClass('hide');

            if (box.hasClass('city__select')) {
                getDistrictByCity(target);
                locations = locationCitys[target];
                currentLocations = locations;
            }

            if (box.hasClass('district__select')) {
                locations = currentLocations.filter(location => location.districtId == target);
            }

            findLocation();

            if (markers.length > 0) {
                map.panTo(markers[0].position);
            }


        }


    });


    $(document).on('keyup', '.select__input', function (e) {
        e.stopPropagation();
        var that = $(this);

        var text_search = change_alias(that.val());
        var box = $(this).parent().parent();
        var list = box.find('ul');
        box.addClass('select__open');

        if (e.keyCode == 13) {
            e.preventDefault();

            if (box.find('li.selected').length) {
                that.val(box.find('li.selected').text());
                box.removeClass('select__open');
                box.find('li').removeClass('hide');

                var target = box.find('li.selected').attr('data-value');

                if (box.hasClass('city__select')) {
                    getDistrictByCity(target);
                    locations = locationCitys[target];
                    currentLocations = locations;
                }

                if (box.hasClass('district__select')) {
                    locations = currentLocations.filter(location => location.districtId == target);
                }

                findLocation();

                if (markers.length > 0) {
                    map.panTo(markers[0].position);
                }


            }

            that.blur();

        } else if (e.keyCode == 38) {
            e.preventDefault();
            var prev = box.find('li.selected').prevAll('li').not('.hide').first();
            if (prev.length) {
                box.find('li').removeClass('selected');
                prev.addClass('selected');
                var top = list.scrollTop();
                list.scrollTop(top - 30);
            } else {
                list.scrollTop(0);
                box.find('li').removeClass('selected');
                box.find('li:first-child').addClass('selected');
            }

            return false;

        } else if (e.keyCode == 40) {
            e.preventDefault();
            var next = box.find('li.selected').nextAll('li').not('.hide').first();
            if (next.length) {
                box.find('li').removeClass('selected');
                next.addClass('selected');
                var top = list.scrollTop();
                list.scrollTop(top + 30);
            } else {
                list.scrollTop(0);
                box.find('li').removeClass('selected');
                box.find('li:first-child').addClass('selected');
            }
            return false;
        } else {
            if (text_search == '') {
                console.log(text_search);
                box.find('li').removeClass('hide').removeClass('selected');
                $(list).scrollTop(0);
            } else {
                box.find('li').removeClass('selected');
                box.find('li').each(function () {
                    var text = change_alias($(this).text());
                    if (text.indexOf(text_search) > -1) {
                        $(this).removeClass('hide');
                        box.find('li:not(.hide)').first().addClass('selected');
                    } else {
                        $(this).addClass('hide');
                    }
                })
            }
        }

    });


    //Close any Tooltip when click out
    $(document).on('click touchstart', function (event) {
        if ($(".fs__select").has(event.target).length == 0 && !$(".fs__select").is(event.target)) {
            $(".fs__select").removeClass("select__open");
        }
    });

    $(document).on('click', '.location__item', function () {
        if (!$(this).hasClass('current')) {
            $('.location__list .location__item').removeClass('current');
            $(this).addClass('current');
        }

        var id = $(this).attr('data-store');
        var marker = getMarkerById(id);
        new google.maps.event.trigger(marker, 'click');

    });


})();