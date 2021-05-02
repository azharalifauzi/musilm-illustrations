import { IllustrationCard } from 'components';
import { fireEvent, render, screen } from 'utils';

describe('Illustration Card Component', () => {
  it('has title', () => {
    render(<IllustrationCard title="Halo" />);

    const Title = screen.getByText(/halo/i);

    expect(Title).toBeInTheDocument();
  });

  it('can be clicked', () => {
    const handleClick = jest.fn();

    render(<IllustrationCard onClick={handleClick} />);

    const Card = screen.getByTestId('card');

    fireEvent.click(Card);

    expect(handleClick).toBeCalled();
  });

  it('has illustration', () => {
    render(
      <IllustrationCard>
        <div>illustration here</div>
      </IllustrationCard>
    );

    const Illustration = screen.getByText(/illustration here/i);

    expect(Illustration).toBeInTheDocument();
  });
});
