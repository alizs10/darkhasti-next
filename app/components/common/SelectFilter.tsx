"use client"

import { useMemo, useState } from 'react'
import Select from './Select'
import { useRouter, useSearchParams } from 'next/navigation';
import { CommentOrder, RequestOrder } from '@/app/types';

type RequestValue = {
    key: RequestOrder;
    label: string;
}
type CommentValue = {
    key: CommentOrder;
    label: string;
}

const request_order_values = [
    {
        key: "visit",
        label: "پربازدیدترین"
    },
    {
        key: "favorite",
        label: "محبوب ترین"
    },
    {
        key: "new",
        label: "جدیدترین"
    },
    {
        key: "comment",
        label: "پربحت ترین"
    },
    {
        key: "old",
        label: "قدیمی ترین"
    },
] satisfies RequestValue[]

const comment_order_values = [
    {
        key: "new",
        label: "جدیدترین"
    },
    {
        key: "favorite",
        label: "محبوب ترین"
    },
    {
        key: "comment",
        label: "پربحت ترین"
    },
    {
        key: "old",
        label: "قدیمی ترین"
    },
] satisfies CommentValue[]

interface SelectFilterProps {
    type: "request" | "comment"
}

export default function SelectFilter({ type }: SelectFilterProps) {

    const searchParams = useSearchParams()
    const order = searchParams.get(type === 'request' ? "order" : "comment_order")
    const search = searchParams.get("search")
    const router = useRouter()

    const values = type === 'request' ? request_order_values : comment_order_values

    let selectedValue = useMemo(() => {
        return values.find(val => val.key === order) ?? values[0]
    }, [order, values])

    function onChange(value: CommentValue | RequestValue) {
        const orderParam = type === 'request' ? 'order' : 'comment_order'
        let url = `?${orderParam}=${value.key}`
        if (search) {
            url += `&search=${search}`
        }
        router.push(url)
    }

    return (
        <Select values={values} value={selectedValue} onChange={onChange} />
    )
}
