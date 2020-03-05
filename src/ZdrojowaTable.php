<?php

namespace Selene\Modules\DashboardModule;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ZdrojowaTable
{
    public function __construct(Builder $builder, Request $request, bool $withoutSelect)
    {
        $this->builder = $builder;
        $this->request = $request;

        $this->totalFiltered = $this->builder->count();
        $this->page = (int) $request->input('pagination.page');
        if($request->input('pagination.perPage') === 'all') {
            $this->perPage = 'all';
        }
        else {
            $this->perPage = (int)$request->input('pagination.perPage');
        }
        $this->filters = $request->input('filters') ?? [];
        $this->columns = $request->input('columns') ?? [];
        $this->withoutSelect = $withoutSelect;
        array_unshift($this->columns, 'id');
    }

    public function selectColumns()
    {
        $this->builder = $this->builder->select($this->columns);

        return $this;
    }

    public function filter()
    {
        foreach ($this->filters as $column => $filter) {
            if ($filter['order']) {
                if($filter['order'] !== 'normal') {
                    $this->builder->orderBy($column, $filter['order']);
                }
            }

            if ($filter['value']) {
                if($filter['value'] === '%%isNotNull%%') {
                    $this->builder->whereNotNull($column);
                }
                elseif ($filter['value'] === '%%isNull%%') {
                    $this->builder->whereNull($column);
                }
                else {
                    $this->builder->where($column, 'like', '%' . $filter['value'] . '%');
                }
            }
        }

        return $this;
    }

    public function paginate()
    {
        if ($this->perPage !== 'all') {
            $this->builder = $this->builder->offset(($this->page - 1) * $this->perPage)->limit($this->perPage);
        }

        return $this;
    }

    public function get()
    {
        return $this->builder->get();
    }

    public function count()
    {
        return $this->builder->count();
    }

    public function getResponse()
    {
        if($this->withoutSelect) {
            $totalRecords = $this->filter()->count();
        }
        else {
            $totalRecords = $this->selectColumns()->filter()->count();
        }

        $items = $this->paginate()->get();

        $response = [
            "totalRecords" => $totalRecords,
            "totalFiltered" => $this->totalFiltered,
            "data" => $items->toArray(),
        ];

        return response()->json($response);
    }

    public static function response(Builder $builder, Request $request, bool $withoutSelect = false)
    {
        return (new ZdrojowaTable($builder, $request, $withoutSelect))->getResponse();
    }

    public static function select(string $model, string $firstColumn, string $secondColumn): array {
        $getFromModel = $model::get([$firstColumn, $secondColumn])->pluck($firstColumn, $secondColumn);

        $select = $getFromModel->map(function($first, $second) {
           return [
               $first, $second
           ];
        })->values();

        return $select->toArray();
    }
}
