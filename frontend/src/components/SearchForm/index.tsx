import {ChangeEvent, FormEvent, useState} from 'react';
import type {NewsItem, SearchResponse} from '@/types';
import {ErrorText, FormContainer, StyledTextField, SubmitButton,} from './styles';

interface Props {
    onResults: (data: { items: NewsItem[]; count: number }, keyword: string) => void
}

export function SearchForm({ onResults }: Props) {
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const term = keyword.trim();
        if (!term) {
            setError('Please enter a keyword.');
            return;
        }
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ keyword: term }),
            });
            const json = (await res.json()) as SearchResponse;
            if (!res.ok) throw new Error(json.error || 'API error');
            onResults({ items: json.items, count: json.count }, term);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unexpected error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <FormContainer onSubmit={handleSubmit}>
            <StyledTextField
                variant="outlined"
                placeholder="Palavra-chave"
                value={keyword}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
                size="medium"
            />

            <SubmitButton
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
            >
                {loading ? 'Pesquisando…' : 'Pesquisar'}
            </SubmitButton>

            {error && <ErrorText>{error}</ErrorText>}
        </FormContainer>
    );
}
