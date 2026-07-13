import { Pressable } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import {
  AppFullScreenLoaderProvider,
  useAppFullScreenLoader,
} from './AppFullScreenLoaderProvider.tsx';

// Minimal mock: the overlay/text hooks all read from this module, but only
// `semiTransparentOverlay` is ever indexed on the code paths this test hits.
jest.mock('../../hooks/useAppThemedColors.ts', () => ({
  useAppThemedColors: () => ({
    semiTransparentOverlay: 'rgba(0,0,0,0.5)',
  }),
}));

const TEST_MESSAGE = 'Loading workout…';

const LoaderConsumer = () => {
  const { showFullScreenLoader, hideFullScreenLoader } =
    useAppFullScreenLoader();

  return (
    <>
      <Pressable
        testID={'show'}
        onPress={() => showFullScreenLoader(TEST_MESSAGE)}
      />
      <Pressable
        testID={'hide'}
        onPress={hideFullScreenLoader}
      />
    </>
  );
};

const ThrowingConsumer = () => {
  useAppFullScreenLoader();
  return null;
};

// `findAllByType` is unreliable here: react-test-renderer resolves the test
// file's `react-native` import to a different module instance than the
// component-under-test's, so `.type` reference equality silently fails.
// Matching on props avoids that pitfall.
const findMessageText = (renderer: ReactTestRenderer.ReactTestRenderer) =>
  renderer.root.findAll(
    instance => instance.props.children === TEST_MESSAGE,
  );

const pressButton = (
  renderer: ReactTestRenderer.ReactTestRenderer,
  testID: string,
) => {
  const [button] = renderer.root.findAll(
    instance =>
      instance.props.testID === testID &&
      typeof instance.props.onPress === 'function',
  );
  ReactTestRenderer.act(() => {
    button.props.onPress();
  });
};

describe('AppFullScreenLoaderProvider', () => {
  it('throws when useAppFullScreenLoader is used outside of a provider', () => {
    expect(() => {
      ReactTestRenderer.act(() => {
        ReactTestRenderer.create(<ThrowingConsumer />);
      });
    }).toThrow(
      'useAppFullScreenLoader must be used within a AppFullScreenLoaderProvider',
    );
  });

  it('shows the overlay with the given message and hides it again', () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;
    ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <AppFullScreenLoaderProvider>
          <LoaderConsumer />
        </AppFullScreenLoaderProvider>,
      );
    });

    expect(findMessageText(renderer!)).toHaveLength(0);

    pressButton(renderer!, 'show');
    expect(findMessageText(renderer!).length).toBeGreaterThan(0);

    pressButton(renderer!, 'hide');
    expect(findMessageText(renderer!)).toHaveLength(0);
  });
});
