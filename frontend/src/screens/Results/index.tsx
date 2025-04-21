import {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import {Pagination} from '@mui/material';
import {NewsList} from '@/components/NewsList';
import type {NewsItem, SortOption} from '@/types';
import {
    Container,
    DateField,
    FilterButton,
    FiltersContainer,
    KeywordField,
    SortField,
    SourceField,
    Title,
} from './styles';

export function ResultsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialKeyword = searchParams.get('keyword') ?? '';
    const initialSource = searchParams.get('source') ?? '';
    const initialStart = searchParams.get('startDate') ?? '';
    const initialEnd = searchParams.get('endDate') ?? '';

    const [keyword, setKeyword] = useState(initialKeyword);
    const [sourceFilter, setSourceFilter] = useState(initialSource);
    const [startDate, setStartDate] = useState(initialStart);
    const [endDate, setEndDate] = useState(initialEnd);
    const [items, setItems] = useState<NewsItem[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [sortOption, setSortOption] = useState<SortOption>('date_desc');
    const [page, setPage] = useState(1);

    const pageSize = 15; // Deve ser o mesmo fixado no backend

    const buildQuery = () => {
        const params = new URLSearchParams();
        if (keyword) params.set('keyword', keyword);
        if (startDate) params.set('startDate', startDate);
        if (endDate) params.set('endDate', endDate);
        if (sourceFilter) params.set('source', sourceFilter);
        if (sortOption) params.set('sort', sortOption);
        params.set('page', String(page));
        params.set('pageSize', String(pageSize));
        return params.toString();
    };

    const fetchData = async () => {
        if (!keyword.trim()) return;
        const query = buildQuery();

        try {
            const res = await fetch(`/notices?${query}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();

            setItems(data.items);
            setTotalPages(data.totalPages);
            setSearchParams(new URLSearchParams(buildQuery()), { replace: true });

            // Ajusta a página se a atual for inválida
            if (data.page > data.totalPages && data.totalPages > 0) {
                setPage(1);
            }
        } catch (err) {
            console.error(err);
            setItems([]);         // Limpa a tela se erro
            setTotalPages(1);
        }
    };

    useEffect(() => {
        if (keyword.trim()) fetchData();
    }, [keyword, sourceFilter, startDate, endDate, page, sortOption]);

    const uniqueSources = useMemo(() => {
        return Array.from(new Set(items.map((n) => n.source)));
    }, [items]);

    return (
        <Container>
            <Title>News History</Title>

            <FiltersContainer>
                <KeywordField
                    label="Palavra-chave"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && setPage(1)}
                    size="small"
                />

                <DateField
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                />

                <DateField
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                />

                <SourceField
                    select
                    label="Source"
                    value={sourceFilter}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSourceFilter(e.target.value)}
                    size="small"
                >
                    <MenuItem value="">All</MenuItem>
                    {uniqueSources.map((src) => (
                        <MenuItem key={src} value={src}>
                            {src}
                        </MenuItem>
                    ))}
                </SourceField>

                <SortField
                    select
                    label="Sort by"
                    value={sortOption}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setSortOption(e.target.value as SortOption)
                    }
                    size="small"
                >
                    <MenuItem value="date_desc">Date: Newest</MenuItem>
                    <MenuItem value="date_asc">Date: Oldest</MenuItem>
                    <MenuItem value="title_asc">Title: A → Z</MenuItem>
                    <MenuItem value="title_desc">Title: Z → A</MenuItem>
                </SortField>

                <FilterButton variant="contained" onClick={() => setPage(1)}>
                    Apply
                </FilterButton>
            </FiltersContainer>

            <NewsList items={items} />

            <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                sx={{ mt: 3, justifySelf: 'center' }}
            />
        </Container>
    );
}
