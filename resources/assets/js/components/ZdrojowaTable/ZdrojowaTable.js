import ZdrojowaHeader from "./ZdrojowaHeader";

const TABLE_TEMPLATE = `
    <div class="ZdrojowaTable--wrapper" id="%%id%%">
        <div class="ZdrojowaTable--per-page">
            Wyników na stronę
            <select name="" data-id="%%id%%">
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="all">Wszystkie</option>
            </select>
        </div>
        <div class="ZdrojowaTable--table-container">
            %%table%%
            <div class="ZdrojowaTable--no-results" style="display: none;">        
                <span>Oops, brak wyników</span>
            </div>
        </div>
        <div class="ZdrojowaTable--pagination">
            <span class="ZdrojowaTable--pagination-span">Strony:</span>
            <ul class="ZdrojowaTable--pagination-nav pagination">
            
            </ul>
        </div>
    </div>

`;

const SORTABLE_TYPES = ['empty', 'text', 'bool', 'list'];
const DEFAULT_TYPE = 'empty';

function debounce(func, wait = 100) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}

class ZdrojowaTable {
    constructor(object, options = null) {
        this.object = {
            table: object,
            wrapper: {
                id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                object: null
            },
            thead: null,
            headers: []
        };

        this.settings = $.extend({
            ajax: {
                method: "post",
                data: {}
            }
        }, options || {});

        this.pagination = {
            perPage: 25,
            page: 1,
            pages: 0
        };

        this.makeTable();
    }

    makeTable = () => {
        this.generateWrapper();
        this.generateHeaders();

        this.object.table.append('<tbody></tbody>');
        this.object.tbody = this.object.wrapper.object.find('tbody');

        this.draw();

        this.object.wrapper.object.on("click", '.ZdrojowaTable--page-link', (event) => {
            this.setPage($(event.target).parent().data('page-id'));
            this.draw();
        })
    };

    generateWrapper() {
        let wrapper = TABLE_TEMPLATE;

        wrapper = wrapper.replace("%%id%%", this.object.wrapper.id);
        wrapper = wrapper.replace("%%id%%", this.object.wrapper.id);
        wrapper = wrapper.replace("%%table%%", this.object.table.prop('outerHTML'));

        this.object.table.replaceWith(wrapper);

        this.object.wrapper.object = $(`#${this.object.wrapper.id}`);

        this.object.table = this.object.wrapper.object.find("table");
        this.object.table.addClass('ZdrojowaTable--table');
        this.object.table.data('ZdrojowaTable', this);
        $(`select[data-id="${this.object.wrapper.id}"]`).chosen({
            disable_search_threshold: 10,
            width: "100"
        }).on('change', this.changePerPage);
        this.object.noResults = this.object.wrapper.object.find('.ZdrojowaTable--no-results');
    }

    changePerPage = () => {
        this.pagination.perPage = $(`select[data-id="${this.object.wrapper.id}"]`).val();
        this.setPage(1);
        this.draw();
    };

    generateHeaders() {
        if (!typeof this.settings.headers === 'array') return;

        this.object.table.append('<thead><tr></tr><tr></tr></thead>');
        this.object.thead = this.object.table.find('thead');

        this.settings.headers.forEach((header, index) => {
            this.object.headers.push(new ZdrojowaHeader(this.object.thead, this.repairHeaderStructure(header), this.inputChange));
        });
    }

    repairHeaderStructure(header) {
        if (!header.name) header.name = "Invalid header name";
        if (!header.type) header.type = DEFAULT_TYPE;
        if (!header.orderable) header.orderable = false;
        if (!header.ajax) header.ajax = false;
        if (!header.select) header.select = [];
        if(!header.buttons) header.buttons = [];
        if(!header.display) header.display = false;
        return header;
    }

    clearBody = () => {
        $(this.object).find('tbody').html('');
    };

    inputChange = debounce(() => {
        this.setPage(1);
        this.draw();
    }, 250);


    makeAjax = async () => {
        const url = this.settings.ajax.url;

        let filters = {};
        let columns = [];

        this.object.headers.forEach((header, index) => {
            if (header.ajax) {
                filters[header.ajax] = {
                    value: header.value,
                    order: header.order
                };
                columns.push(header.ajax);
            }
        });

        const data = {
            ...this.settings.ajax.data,
            filters: filters,
            pagination: this.pagination,
            columns: columns
        };

        this.settings.ajax.data = data;

        return $.ajax({...this.settings.ajax,});
    };

    setPagesCount = (items) => {
        let pages = Math.ceil(items / this.pagination.perPage);

        if (pages === this.pagination.pages) return;
        if (pages === 0 || this.pagination.perPage === 'all') pages = 1;
        this.pagination.pages = pages;

        this.drawPaginationButtons();
    };

    drawPaginationButtons = () => {
        let pagesButtons = '';

        for (var page = 1; page <= this.pagination.pages; page++) {
            pagesButtons += `<li class="page-item" data-page-id="${page}"><a class="ZdrojowaTable--page-link page-link" href="#">${page}</a></li>`;
        }

        this.object.wrapper.object.find('.ZdrojowaTable--pagination-nav').html(pagesButtons);

        $(`.page-item[data-page-id="${this.pagination.page}"]`).addClass('active');
    };

    setPage = (page) => {
        this.object.wrapper.object.find('.page-item').removeClass('active');
        if (page === this.pagination.page) return;

        if (page > this.pagination.pages || page < 1) {
            this.pagination.page = 1;
            this.object.wrapper.object.find(`.page-item[data-page-id="${this.pagination.page}"]`).addClass('active');
            return;
        }
        this.pagination.page = page;
        this.object.wrapper.object.find(`.page-item[data-page-id="${this.pagination.page}"]`).addClass('active');
    };

    draw = debounce(() => {
        //this.object.tbody.hide();

        this.drawPaginationButtons();
        const data = this.makeAjax();

        data.then((response) => {
            this.setPagesCount(response.totalRecords);
            let index = (this.pagination.page - 1) * this.pagination.perPage + 1;
            if(this.pagination.perPage === 'all') {
                index = 1;
            }
            this.object.tbody.html("");

            let rows = '';
            response.data.forEach((item) => {
                let row = `<tr>`;

                if(item['_id']) {
                    item['id'] = item['_id'];
                }
                this.object.headers.forEach((header) => {
                    if(!item[header.ajax]) item[header.ajax] = "Brak";
                    if(!item[header.display]) item[header.display] = "Brak";

                    if (header.type === 'index') {
                        row += `<td>${index}</td>`;
                        return;
                    }

                    if(header.type === 'actions') {
                        row += `<td>`;
                        header.buttons.forEach(button => {
                           const buttonClass = button.class ? button.class : '';

                           if(!button.url) return;


                           let url = button.url;
                           const color = button.color ? button.color : 'primary';

                           const icon = button.icon ? `<i class="${button.icon}"></i>` : '';
                           let text = button.text ? button.text : '';

                           const toReplace = getFromBetween.get(url, "%%", "%%");
                           toReplace.forEach((column) => {
                               url = url.replace(`%%${column}%%`, item[column]);
                           });


                           if(text !== '' && icon !== '') {
                               text = `<span class="ml-1">${text}</span>`
                           }

                           row += `<div class="ZdrojowaTable--action"><a href="${url}" class="btn btn-sm btn-${color} ${buttonClass}">${icon}${text}</a></div>`
                        });

                        row += '</td>';
                        index++;
                        return;
                    }

                    if(header.display) {
                        row += `<td>${item[header.display]}</td>`;
                        return;
                    }

                    row += `<td>${item[header.ajax]}</td>`
                });

                row += '</tr>';
                rows += row;
            });
            this.object.tbody.html('');
            this.object.tbody.append(rows);
            if(response.data.length === 0) {
                this.object.noResults.show();
            }
            else {
                this.object.noResults.hide();
            }
            this.object.tbody.show();
        })
    }, 0);
}

var getFromBetween = {
    results:[],
    string:"",
    getFromBetween:function (sub1,sub2) {
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        var SP = this.string.indexOf(sub1)+sub1.length;
        var string1 = this.string.substr(0,SP);
        var string2 = this.string.substr(SP);
        var TP = string1.length + string2.indexOf(sub2);
        return this.string.substring(SP,TP);
    },
    removeFromBetween:function (sub1,sub2) {
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        var removal = sub1+this.getFromBetween(sub1,sub2)+sub2;
        this.string = this.string.replace(removal,"");
    },
    getAllResults:function (sub1,sub2) {
        // first check to see if we do have both substrings
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;

        // find one result
        var result = this.getFromBetween(sub1,sub2);
        // push it to the results array
        this.results.push(result);
        // remove the most recently found one from the string
        this.removeFromBetween(sub1,sub2);

        // if there's more substrings
        if(this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
            this.getAllResults(sub1,sub2);
        } else {

        }
    },
    get:function (string,sub1,sub2) {
        this.results = [];
        this.string = string;
        this.getAllResults(sub1,sub2);
        return this.results;
    }
};

$.fn.zdrojowaTable = function (options) {
    const object = $(this);
    if(object.data('ZdrojowaTable')) return object.data('ZdrojowaTable');

    const zt = new ZdrojowaTable(this, options);

    object.data('ZdrojowaTable', zt);
    return ZdrojowaTable;
};

$(function() {
    $("body").on("click", ".ZdrojowaTable--remove-action", function(e) {
        e.preventDefault();
        const tr = $(this).closest('tr');
        const url = $(this).attr('href');

        Swal.fire({
            title: 'Na pewno chcesz to zrobić?',
            text: 'Nie będzie można tego przywrócić!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d53f3a',
            confirmButtonText: 'Tak',
            cancelButtonText: 'Powrót'
        }).then(result => {
            if(!result.value) return;

            $.ajax({
                url: url,
                method: "DELETE",
                data: {
                    "_token": $('meta[name="csrf-token"]').attr("content")
                },
                success: function () {
                    Swal.fire('Usunięto!', 'Akcja zakończyła się sukcesem', 'success');
                    $('table').zdrojowaTable().draw();
                },
                error: function () {
                    Swal.fire('Wystąpił błąd!', 'Wystąpił błąd po stronie serwera', 'error');
                }
            })
        })
    })
});

export default ZdrojowaTable;
