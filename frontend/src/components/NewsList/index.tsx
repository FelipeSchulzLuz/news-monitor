import type {NewsItem} from '@/types';
import {formatPubDate} from '@/utils';
import {
    CardBody,
    CardImage,
    Description,
    EmptyMessage,
    ListContainer,
    PublishDate,
    StyledCard,
    Title,
    TitleLink,
} from './styles';

interface Props {
    items: NewsItem[];
}

export function NewsList({ items }: Props) {
    if (items.length === 0) {
        return <EmptyMessage>Sem resultados para essa palavra.</EmptyMessage>;
    }

    return (
        <ListContainer>
            {items.map((item, idx) => (
                <StyledCard key={idx}>
                    {item?.image && <CardImage src={item.image} alt={item.title} />}
                    <CardBody>
                        <Title>
                            <TitleLink
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {item.title}
                            </TitleLink>
                        </Title>

                        {item?.description && <Description>{item.description}</Description>}

                        <PublishDate>{formatPubDate(item.publishedAt)}</PublishDate>
                        <PublishDate>{item.source}</PublishDate>
                    </CardBody>
                </StyledCard>
            ))}
        </ListContainer>
    );
}
