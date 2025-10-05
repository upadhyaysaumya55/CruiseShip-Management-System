from django.test import TestCase
from django.contrib.auth import get_user_model

class UserModelTests(TestCase):
    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(email='test@example.com', password='pass123')
        self.assertEqual(user.email, 'test@example.com')
        self.assertTrue(user.check_password('pass123'))
