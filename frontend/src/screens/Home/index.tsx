import {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Box, Button, Typography} from '@mui/material';
import type {NewsItem} from '@/types';
import {SearchForm} from '@/components/SearchForm';
import {NewsList} from '@/components/NewsList';
import {ContentWrapper, LogoImage, MainContainer, PageContainer, ResultsText,} from './styles';

import Logo from '@/assets/images/news_monitor2.png';

export function HomePage() {
    const [items, setItems] = useState<NewsItem[]>([]);
    const [searched, setSearched] = useState(false);
    const [lastKeyword, setLastKeyword] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const isEmpty = items.length === 0;

    function handleResults(data: { items: NewsItem[]; count: number }, keyword: string) {
        setItems(data.items);
        setTotalCount(data.count);
        setSearched(true);
        setLastKeyword(keyword);
    }

    return (
        <PageContainer>
            <ContentWrapper isEmpty={isEmpty}>
                <LogoImage src={Logo} alt="News Monitor" />

                <SearchForm onResults={handleResults} />

                {searched && isEmpty ? (
                    <Box textAlign="center" mt={4}>
                        <Typography color="text.secondary">
                            Sem artigos novos para "{lastKeyword}".
                        </Typography>
                        <Button
                            component={RouterLink}
                            to={`/results?keyword=${encodeURIComponent(lastKeyword)}`}
                            variant="outlined"
                            sx={{ mt: 2 }}
                        >
                            Ver artigos salvos
                        </Button>
                    </Box>
                ) : (
                    <MainContainer>
                        <ResultsText>
                            Aproximadamente {totalCount} resultado{totalCount !== 1 ? 's' : ''}
                        </ResultsText>
                        <NewsList items={items} />
                    </MainContainer>
                )}
            </ContentWrapper>
        </PageContainer>
    );
}
