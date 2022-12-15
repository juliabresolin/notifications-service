import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-id-01' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-id-01' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-id-02' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-id-01',
    });

    expect(count).toEqual(2);
  });
});
