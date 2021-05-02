import { IllustrationDetail } from 'components';
import { render, screen, fireEvent } from 'utils';

describe('Illustration Detail Component', () => {
  it('close modal when onClose triggered', () => {
    const handleClose = jest.fn();

    render(<IllustrationDetail isOpen onClose={handleClose} />);

    const CloseButton = screen.getByTestId(/close-button/i);

    fireEvent.click(CloseButton);

    expect(handleClose).toBeCalled();
  });

  it('has title and author', () => {
    render(<IllustrationDetail isOpen title="Hadj" author="Syamil" />);

    const Title = screen.getByText(/hadj/i);
    const Author = screen.getByText(/syamil/i);

    expect(Title).toBeInTheDocument();
    expect(Author).toBeInTheDocument();
  });

  it('has illustration', () => {
    render(
      <IllustrationDetail isOpen>
        <div data-testid="illustration">Illustration</div>
      </IllustrationDetail>
    );

    const Illustration = screen.getByTestId(/illustration/i);

    expect(Illustration).toBeInTheDocument();
  });

  it('has button svg and png', () => {
    render(<IllustrationDetail isOpen />);

    const svgButton = screen.getByText(/svg/i);
    const pngButton = screen.getByText(/png/i);

    expect(svgButton).toBeInTheDocument();
    expect(pngButton).toBeInTheDocument();
  });
});
