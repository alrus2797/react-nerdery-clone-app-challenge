import styled from 'styled-components';
import { Flex } from '../../../shared/ui/flex';
import { SectionItem } from '../../../shared/types/section-item';
import {
  ShelfSection,
  ShelfTitleContainer,
  ShelfLinkContainer,
} from './styles';
import { ShelfCard, ShelfCardsContainer } from './shelf-card';
import { Heading2 } from '../../../shared/ui/heading2';

interface ShelfProps {
  title: string;
  shelfLink: string;
  items: SectionItem[];
  className?: string;
  uri: string;
}

const Shelf = ({ title, shelfLink, items, className, uri }: ShelfProps) => (
  <ShelfSection className={className}>
    <Flex margin="0 0 16px">
      <ShelfTitleContainer>
        <Heading2>
          <a href={shelfLink}>{title}</a>
        </Heading2>
      </ShelfTitleContainer>
        <ShelfLinkContainer>
          <a href={shelfLink}>Show all</a>
        </ShelfLinkContainer>
    </Flex>
    <ShelfCardsContainer
      gridGap={24}
      columnCount={6}
      minContainerWidth={372}
      columnWidth={174}
    >
      {items.map(item => (
        <ShelfCard key={item.uri}>
          <div className="portrait">
            <img src={item.image.url} alt={item.name} />
          </div>
          <div className="card-text">
            <a href={`/song/${item.uri}`}>
              <div>{item.name}</div>
            </a>
            <div>{item.description}</div>
          </div>
        </ShelfCard>
      ))}
    </ShelfCardsContainer>
  </ShelfSection>
);

export const StyledShelf = styled(Shelf)`
  flex: 1 1 auto;
  flex-basis: 100%;
`;
