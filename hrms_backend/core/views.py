from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer

class EmployeeListCreateView(APIView):

    def get(self, request):
        employees = Employee.objects.all().order_by("-created_at")
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(
            {"errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
    
class EmployeeDeleteView(APIView):

    def delete(self, request, pk):
        try:
            employee = Employee.objects.get(pk=pk)
            employee.delete()
            return Response(
                {"message": "Employee deleted successfully."},
                status=status.HTTP_200_OK
            )
        except Employee.DoesNotExist:
            return Response(
                {"error": "Employee not found."},
                status=status.HTTP_404_NOT_FOUND
            )

class AttendanceListCreateView(APIView):

    def get(self, request):
        employee_id = request.query_params.get("employee")

        if employee_id:
            attendance = Attendance.objects.filter(employee_id=employee_id)
        else:
            attendance = Attendance.objects.all()

        serializer = AttendanceSerializer(attendance, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = AttendanceSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(
            {"errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
    
class DashboardView(APIView):

    def get(self, request):
        total_employees = Employee.objects.count()
        total_attendance = Attendance.objects.count()

        return Response({
            "total_employees": total_employees,
            "total_attendance_records": total_attendance
        })