<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../api'

const router = useRouter()

const form = ref({
  name: '',
  email: '',
  department: '',
  position: '',
  password: ''
})

const handleSubmit = async () => {
  try {
    const res = await api.post('/api/users' , form.value)
    alert('เพิ่มผู้ใช้งานสำเร็จ')
    router.back()
  } catch (err) {
    alert(err.message || 'เกิดข้อผิดพลาดในการเพิ่มผู้ใช้งาน')
  }
}

const handleCancel = () => {
  router.back()
}
</script>

<template>
  <div class="w-full">

    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold">
        เพิ่มผู้ใช้งาน
      </h1>

      <p class="text-sm opacity-60 mt-1">
        กรอกข้อมูลผู้ใช้งานใหม่
      </p>
    </div>

    <!-- Form -->
    <div class="w-full max-w-3xl bg-base-100 rounded-lg shadow-sm p-6">

      <form @submit.prevent="handleSubmit">

        <!-- ชื่อ -->
        <div class="form-control mb-5">
          <label class="label">
            <span class="label-text font-medium">
              ชื่อ - นามสกุล
            </span>
          </label>

          <input
            v-model="form.name"
            type="text"
            placeholder="กรอกชื่อ - นามสกุล"
            class="input input-bordered w-full"
            required
          />
        </div>

        <!-- Email -->
        <div class="form-control mb-5">
          <label class="label">
            <span class="label-text font-medium">
              Email
            </span>
          </label>

          <input
            v-model="form.email"
            type="email"
            placeholder="example@email.com"
            class="input input-bordered w-full"
            required
          />
        </div>

        <!-- Department -->
        <div class="form-control mb-5">
          <label class="label">
            <span class="label-text font-medium">
              แผนก
            </span>
          </label>

          <select
            v-model="form.department"
            class="select select-bordered w-full"
            required
          >
            <option value="" disabled>
              เลือกแผนก
            </option>

            <option value="IT">
              เทคโนโลยีสารสนเทศ (IT)
            </option>

            <option value="ME">
              ช่างยนต์ (ME)
            </option>

            <option value="EL">
              อิเล็กทรอนิกส์ (EL)
            </option>

            <option value="ACC">
              การบัญชี (ACC)
            </option>

            <option value="MKT">
              การตลาด (MKT)
            </option>
          </select>
        </div>

        <!-- Position -->
        <div class="form-control mb-5">
          <label class="label">
            <span class="label-text font-medium">
              ตำแหน่ง
            </span>
          </label>

          <input
            v-model="form.position"
            type="text"
            placeholder="เช่น อาจารย์, นักพัฒนาระบบ"
            class="input input-bordered w-full"
            required
          />
        </div>

        <!-- Password -->
        <div class="form-control mb-6">
          <label class="label">
            <span class="label-text font-medium">
              รหัสผ่าน
            </span>
          </label>

          <input
            v-model="form.password"
            type="password"
            placeholder="กำหนดรหัสผ่านเริ่มต้น"
            class="input input-bordered w-full"
            minlength="6"
            required
          />

          <label class="label">
            <span class="label-text-alt opacity-60">
              รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร
            </span>
          </label>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-3">

          <button
            type="button"
            class="btn btn-ghost"
            @click="handleCancel"
          >
            ยกเลิก
          </button>

          <button
            type="submit"
            class="btn btn-success"
          >
            เพิ่มผู้ใช้งาน
          </button>

        </div>

      </form>
    </div>

  </div>
</template>