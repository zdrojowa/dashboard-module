# Zdrojowa Table

####Tworzenie tabeli

```html
<div>
    <table id="table" class="table table-striped"></table>
</div>
```

####Inicjalizacja zdrojowatable

```js
$('#table').zdrojowaTable({
    ajax: {
        url: '/dashboard/test',
          method: 'POST',
        data: {
            "_token": "{{csrf_token()}}"
        },
    },    
    headers: [
        //Kolumny
    ]
});
```

Struktura kolumny

```js
{
    name: "Nazwa kolumny",
    type: "Typ kolumny",
    ajax: 'Nazwa kolumny w bazie danych' //Opcjonalne,
    orderable: 'true||false' (Czy można sortować daną kolumne) // Opcjonalne,
}
```

Typy kolumn

Typ używany do liczby porządkowej
```js
type: "index"
```

Typ używany do wyszukiwania po tekscie

```js
type: "text",
ajax: "name" // Wymagane przy tym typie
```

Typ używany do wybierania z listy

```js
type: "select",
ajax: "name", // Wymagane przy tym typie
select: [
    // [wartość, nazwa]
    ["Andrzej", "Imię Andrzej"]
    // Generuje <option value="Andrzej">Imię Andrzej</option
] // Wymagane przy tym typie
```

Typ booleana

```js
// Generuje selecta z opcjami do wyboru Tak/Nie
type: "bool",
ajax: "active", // Wymagane przy tym typie
```

Typ do generowania guzików

```js
type: "actions",
buttons: [
    // Lista guzików do generowania
    // Przykładowy guzik
    {
        color: 'primary' // Kolor guzika opcjonalny domyślnie primary
        text: 'Edytuj', // Text wyświetlany na guziku opcjonalny,
        icon: 'mdi mdi-pencil', // Ikona wyświetlana na guziku opcjonalny,
        class: 'remove', // Dodatkowe klasy do guzika opcjonalny
        url: 'http://127.0.0.1:8000/dashboard/%%id%%/%%name%%' // Url gdzie ma przenosić, zmienen deklarujemy poprzez %%nazwakolumnybazydanych%%
    }
]
```

Opcjonalne parametry headera

```js
type: 'select'
ajax: "permission_package_id"
display: 'permission_package_name' // Wyświetla inną wartość niż filtruje
```




