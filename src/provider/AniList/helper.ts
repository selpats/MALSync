export { aniListToMal } from '../../_provider/AniList/helper';

export function errorHandling(res, silent = true): any {
  if (typeof res !== 'undefined' && typeof res.errors !== 'undefined') {
    for (let i = 0, len = res.errors.length; i < len; i++) {
      const error = res.errors[i];
      switch (error.status) {
        case 400:
          if (!silent) {
            utils.flashm(
              api.storage.lang('Error_Authenticate', [
                'https://anilist.co/api/v2/oauth/authorize?client_id=1487&response_type=token',
              ]),
              {
                error: true,
                type: 'error',
              },
            );
            return 'noLogin';
          }
          break;
        case 404:
          if (!silent) {
            utils.flashm(`anilist: ${error.message}`, {
              error: true,
              type: 'error',
            });
          }
          break;
        default:
          if (!silent) {
            utils.flashm(`anilist: ${error.message}`, {
              error: true,
              type: 'error',
            });
          }
          throw error.message;
      }
    }
  }
  return true;
}
