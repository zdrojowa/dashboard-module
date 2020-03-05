const TEMPLATES = {
    empty: ``,
    index: ``,
    actions: ``,
    text: `
        <input type="text" data-id="%%id%%" name="%%ajax%%" placeholder="Szukaj" autocomplete="off">  
    `,
    select: `
        <select name="%%ajax%%" data-id="%%id%%">
            <option value="">Szukaj</option>
            %%select%%
        </select>
    `,
    bool: `
         <select name="%%ajax%%" data-id="%%id%%">
            <option value="">Szukaj</option>
            <option value="0">Nie</option>
            <option value="1">Tak</option>
        </select>
    `
}

const ORDERABLE = `
<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="#000000" d="M7,10L12,15L17,10H7Z" />
</svg>
`;

const FIRST_ROW = `
    <th data-id="%%id%%">
        <div class="Zdrojowa--header">
            <span>%%name%%</span>
            %%orderable%%
        </div>
    </th>
`;

const SECOND_ROW = `
    <th>
        %%type_template%%
    </th>
`;

class ZdrojowaHeader {
    constructor(thead, headerData, handler) {
        this.thead = thead;
        this.name = headerData.name;
        this.type = headerData.type;
        this.orderable = headerData.orderable;
        this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.ajax = headerData.ajax;
        this.value = '';
        this.order = '';
        this.buttons = headerData.buttons;
        this.display = headerData.display;
        this.handler = handler;
        if (this.orderable) {
            this.order = 'asc';
        }
        this.select = headerData.select;
        this.buildFirstRow();
        this.buildSecondRow();
        this.bindEvents();
    }

    buildFirstRow = () => {
        this.thead.find('tr').eq(0).append(this.fixTemplate(FIRST_ROW));
        this.th = this.thead.find(`th[data-id="${this.id}"`);

        if (this.orderable) {
            this.th.addClass("ZdrojowaTable--pointer");
            this.th.addClass("ZdrojowaTable--orderable");
            this.th.addClass("ZdrojowaTable--asc");
        }
    }

    buildSecondRow() {
        this.thead.find('tr').eq(1).append(this.fixTemplate(SECOND_ROW));

        if(this.type === 'text') {
            this.input = $(`input[data-id="${this.id}"`);
        }
        else if(this.type === 'select' || this.type === 'bool') {
            this.input = $(`select[data-id="${this.id}"`);
        }

        this.thead.find('tr').eq(1).find(`select[data-id="${this.id}"`).chosen({
            width: "100%",
            no_results_text: "Oops, brak wyników dla:"
        });
    }

    fixTemplate(template) {
        template = template.replace("%%name%%", this.name);
        template = template.replace("%%ajax%%", this.ajax);
        template = template.replace("%%id%%", this.id);
        template = template.replace("%%type%%", this.type);

        if (this.select.length > 0) {
            let select = '';

            this.select.forEach((option) => {
                select += `<option value="${option[0]}">${option[1]}</option>`;
            });

            template = template.replace("%%select%%", select);
        }
        if (this.orderable) {
            template = template.replace("%%orderable%%", ORDERABLE);
        } else {
            template = template.replace("%%orderable%%", '');
        }

        if (template.indexOf('%%type_template') !== -1) {
            template = template.replace("%%type_template%%", this.fixTemplate(TEMPLATES[this.type]));
        }

        return template;
    }

    changeOrder = () => {
        if (this.order === "desc") {
            this.order = "asc";
            this.th.removeClass('ZdrojowaTable--desc');
            this.th.addClass('ZdrojowaTable--asc');
        } else if(this.order === 'asc') {
            this.order = "normal";
            this.th.addClass('ZdrojowaTable--normal');
            this.th.removeClass('ZdrojowaTable--asc');
        }
        else if(this.order === 'normal') {
            this.order = "desc"
            this.th.addClass('ZdrojowaTable--desc');
            this.th.removeClass('ZdrojowaTable--normal');
        }

        this.handler();
    }

    onChange = () => {
        this.value = this.input.val();
        this.handler();
    }
    bindEvents = () => {
        $(`.ZdrojowaTable--orderable[data-id="${this.id}"]`).on("click", this.changeOrder);

        if(this.input) {
            this.input.on("keyup change", this.onChange);
        }
    }


}

export default ZdrojowaHeader;
