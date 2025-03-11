from django.http import JsonResponse


def example_view(request):
   data = {
       "message": "Hello, this is a test response from the rooms app!"
   }
   return JsonResponse(data)



