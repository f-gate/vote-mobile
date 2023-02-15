import * as Keychain from 'react-native-keychain';

const prefix = 'vote-mobile-';

async function storeKeys (chain: string, keys: any) {
  // Store the credentials
  await Keychain.setGenericPassword(chain, keys, {
    service: prefix + chain,
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
  });
};

async function hasKeys (chain: string): Promise<boolean> {
    try {
        const options: Keychain.Options = {
            service: prefix + chain,
            authenticationPrompt: {
              title: 'Authentication needed',
              subtitle: 'Subtitle',
              description: 'Some descriptive text',
              cancel: 'Cancel',
            },
          };
        // Retrieve the credentials
        const credentials = await Keychain.getGenericPassword(options);
        if (credentials) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false
      }
}

async function getAddress (chain: string): Promise<string> {
  try {
      const options: Keychain.Options = {
          service: prefix + chain,
          authenticationPrompt: {
            title: 'Authentication needed',
            subtitle: 'Subtitle',
            description: 'Some descriptive text',
            cancel: 'Cancel',
          },
        };
      // Retrieve the credentials
      const credentials = await Keychain.getGenericPassword(options);
      if (credentials) {
        const password = (credentials.password) as any;
        return password.address;
      } else {
        return "";
      }
    } catch (error) {
      return ""
    }
}

export {storeKeys, hasKeys, getAddress}