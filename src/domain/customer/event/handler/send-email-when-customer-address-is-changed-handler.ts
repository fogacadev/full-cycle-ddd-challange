import EventHandlerInterface from '../../../@shared/event/event-handler.interface'
import eventInterface from '../../../@shared/event/event.interface'

export default class SendEmailWhenCustomerAddressIsChangedHandler
  implements EventHandlerInterface
{
  handle(event: eventInterface): void {
    console.log(  `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado: ${event.eventData.address}`)
  }
}