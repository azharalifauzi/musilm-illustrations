import * as nextRouter from 'next/router';
import { IllustrationDetail } from 'components';
import { render, screen, fireEvent } from 'utils';
import { QueryClient, QueryClientProvider } from 'react-query';

// @ts-ignore
nextRouter.useRouter = jest.fn();
// @ts-ignore
nextRouter.useRouter.mockImplementation(() => ({ asPath: '/' }));

const client = new QueryClient();

const Wrapper: React.FC = ({ children }) => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

describe('Illustration Detail Component', () => {
  it('close modal when onClose triggered', () => {
    const handleClose = jest.fn();

    render(
      <Wrapper>
        <IllustrationDetail isOpen onClose={handleClose} />
      </Wrapper>
    );

    const CloseButton = screen.getByTestId(/close-button/i);

    fireEvent.click(CloseButton);

    expect(handleClose).toBeCalled();
  });

  it('has title and author', () => {
    render(
      <Wrapper>
        <IllustrationDetail isOpen title="Hadj" author="Syamil" />
      </Wrapper>
    );

    const Title = screen.getByText(/hadj/i);
    const Author = screen.getByText(/syamil/i);

    expect(Title).toBeInTheDocument();
    expect(Author).toBeInTheDocument();
  });

  it('has illustration', () => {
    render(
      <Wrapper>
        <IllustrationDetail isOpen>
          <div data-testid="illustration">Illustration</div>
        </IllustrationDetail>
      </Wrapper>
    );

    const Illustration = screen.getByTestId(/illustration/i);

    expect(Illustration).toBeInTheDocument();
  });

  it('has button svg and png', () => {
    render(
      <Wrapper>
        <IllustrationDetail isOpen />
      </Wrapper>
    );

    const svgButton = screen.getByText(/svg/i);
    const pngButton = screen.getByText(/png/i);

    expect(svgButton).toBeInTheDocument();
    expect(pngButton).toBeInTheDocument();
  });
});
